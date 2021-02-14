// const pe = require("parse-error");
const User = require("../models/user");

const getUniqueErrorMessage = (err) => {
	let output;
	try {
		let fieldName = err.message.substring(
			err.message.lastIndexOf("index: ") + 7,
			err.message.lastIndexOf("_1")
		);
		output = field_base[fieldName] + " already exists";
	} catch (ex) {
		output = "Unique field already exists";
	}

	return output;
};

module.exports.getErrorMessage = (err) => {
	let message = "";

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = getUniqueErrorMessage(err);
				break;
			default:
				message = "Something went wrong";
		}
	} else if (err.message && (err.message.includes("11000") || err.message.includes("11001"))) {
		message = getUniqueErrorMessage(err);
	} else if (err.message) {
		message = err.message.split(":");
		count = message.length;
		message = message[count - 1];
	} else {
		for (let errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

module.exports.getUser = (req, res, next) => {
	User.findOne({ _id: req.auth._id },{}, {select: "-salt -hashed_password"}, (err, user) => {
		if (err || !user) return res.status(404).send({ error: "User not found" });
		req.user = user;
		next();
	});
}

module.exports.validateAdmin = (req, res, next) => {
	if (req.user.role === 'admin') next();
	else return res.status(401).send({ error: "Access denied" });
}