const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
jwt_secret = process.env.JWT_SECRET;

module.exports.signin = (req, res) => {
    req.body.username = `^${req.body.username}$`
    User.findOne({ username: { $regex: req.body.username, $options: "i" } }, async (err, user) => {
        if (err || !user || !user.authenticate(req.body.password)) {
            console.log(err);
            return res.status("401").send({ error: "Invalid username or password." });
        }

        if (!user.active) return res.status(401).send({ error: "Disabled user" });

        const token = jwt.sign({ _id: user._id, role: user.role }, jwt_secret);
        const user_resp = JSON.parse(JSON.stringify(user));
        delete user_resp.salt;
        delete user_resp.hashed_password;
        return res.send({
            token,
            user: user_resp
        });
    });
};

module.exports.requireSignin = expressJwt({
    secret: jwt_secret,
    userProperty: "auth",
    algorithms: ['HS256']
});
