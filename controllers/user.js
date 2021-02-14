const User = require("../models/user");
const { getErrorMessage } = require("../helpers/middleware");
const { welcome } = require("../helpers/emails");

module.exports.create = async (req, res) => {

	const username = `^${req.body.username}$`;
	const email = `^${req.body.email}$`;
	User.findOne({
		$or: [
			{ email: { $regex: email, $options: "i" } },
			{ username: { $regex: username, $options: "i" } }
		],
	}, async (err, new_user) => {
		if (err || new_user) return res.status(400).send({ error: "User or email already exists" });
		req.body.role = "operator";
		try {
			new_user = new User(req.body);
			await new_user.save();
			new_user = JSON.parse(JSON.stringify(new_user));
			delete new_user.salt;
			delete new_user.hashed_password;
			welcome(req.body.email, req.body.username, req.body.password);
			return res.status(201).send(new_user);
		} catch (err) {
			return res.status(400).send({ error: getErrorMessage(err) });
		}
	}
	);
};

module.exports.getAll = async (req, res) => {
	let qs = {};
	if (req.query.filter) {
		const search = req.query.filter;
		qs.$or = [
			{ name: { $regex: search, $options: "i" } },
			{ email: { $regex: search, $options: "i" } },
			{ username: { $regex: search, $options: "i" } }
		];
	}
	const users = await User.find(qs, {}, { select: "-salt -hashed_password" });
	return res.status(200).send(users);
};

module.exports.getOne = async (req, res) => {
	if (req.user.role == "operator" && !req.user._id.equals(req.params.userId))
		return res.status(401).send({ error: "Access denied" });
	else if (req.user._id.equals(req.params.userId)) return res.send(req.user);
	else {
		const user = await User.findById(req.params.userId, {}, { select: "-salt -hashed_password" });
		if (!user) return res.status(404).send({ error: "User not found" });
		else return res.send(user);
	}
};

module.exports.update = async (req, res) => {
	let user = await User.findById(req.params.userId);
	if (!user) return res.status(404).send({ error: "User not found" });
	if (req.body.new_password) {
		if (req.body.new_password.length < 6) return res.status(400).send({ error: 'The new password must contain 6 characters or more' });
		if (!user.authenticate(req.body.current_password)) return res.status(400).send({ error: 'Current password is invalid'});
		user.password = req.body.new_password;
	}
	user.name = req.body.name || user.name;
	user.username = req.body.username || user.username;
	user.email = req.body.email || user.email;
	user.active = (typeof req.body.active == 'boolean') ? req.body.active : user.active;
	try {
		await user.save();
		user.salt = undefined;
		user.hashed_password = undefined;
		return res.send(user);
	} catch (err) {
		console.log(err);
		return res.status(400).send({ error: getErrorMessage(err) });
	}
};

module.exports.remove = async (req, res) => {
	if (req.user._id.equals(req.params.userId))
		return res.status(400).send({ error: "You are not allowed to delete yourself user" });
	try {
		let user_to_delete = await User.findOneAndDelete({ _id: req.params.userId });
		if (!user_to_delete) return res.status(404).send({ error: "User not found" });
		else return res.status(204).send();
	} catch(err) {
		return res.status(400).send({ error: getErrorMessage(err) });
	}
};

module.exports.createAdmin = async (req, res) => {
	const username = `^${req.body.username}$`;
	const email = `^${req.body.email}$`;
	User.findOne({
		$or: [
			{ email: { $regex: email, $options: "i" } },
			{ username: { $regex: username, $options: "i" } }
		],
	}, async (err, user) => {
		if (err || user)
			return res.status(400).send({ error: "User or email already exists" });
		req.body.role = 'admin';
		try {
			user = new User(req.body);
			await user.save();
			return res.status(201).send(user);
		} catch (err) {
			return res.status(400).send({ error: getErrorMessage(err) });
		}
	});
};
