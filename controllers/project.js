const Project = require("../models/project");
const Task = require("../models/task");
const User = require("../models/user");
const mongoose = require("mongoose");
const { getErrorMessage } = require("../helpers/middleware");
const { projectDone } = require("../helpers/emails");

module.exports.create = async (req, res) => {

	try {
		let start_date = new Date(req.body.start_date);
		let end_date = req.body.end_date ? new Date(req.body.end_date) : null;
		if (end_date != null && start_date >= end_date) return res.status(400).send({ error: 'invalid date range' });
		let project = new Project(req.body);
		await project.save();
		return res.status(201).send(project);
	} catch (err) {
		return res.status(400).send({ error: getErrorMessage(err) });
	}

};

module.exports.getAll = async (req, res) => {
	let qs = {};
	if (req.query.filter) {
		const search = req.query.filter;
		qs.$or = [
			{ name: { $regex: search, $options: "i" } },
			{ status: { $regex: search, $options: "i" } }
		];
	}
	const projects = await Project.find(qs);
	return res.status(200).send(projects);
};

module.exports.getOne = async (req, res) => {
	let project = await Project.findById(req.params.projectId);
	if (!project) return res.status(404).send({ error: "Project not found" });
	return res.send(project);
};

module.exports.update = async (req, res) => {
	let project = await Project.findById(req.params.projectId);
	if (!project) return res.status(404).send({ error: "Project not found" });

	project.name = req.body.name || project.name;
	project.description = req.body.description || project.description;
	let doneProject = false;
	let administrators = [];
	if (req.body.end_date) {
		try {
			const end_date = new Date(req.body.end_date);
			if (project.start_date >= end_date) return res.status(400).send({ error: 'The new end date is prior to the start date' });
			const tasks = await Task.countDocuments({ project: project._id, status: 'inprogress', execution_date: { $gt: end_date } });
			if (tasks > 0) return res.status(400).send({ error: "There are tasks with run dates after the new finish date" });
			project.end_date = end_date;
		} catch (err) {
			console.log(err);
			return res.status(400).send({ error: getErrorMessage(err) });
		}
	}
	if (req.body.status && req.body.status == "done") {
		const tasks = await Task.countDocuments({ project: project._id, status: 'inprogress' });
		if (tasks > 0) return res.status(400).send({ error: "There are still unfinished tasks" });
		project.status = "done";
		administrators = await User.find({role: "admin"}, {}, {lean: true, select: "email -_id"});
		administrators = administrators.map(user => user.email);
		doneProject = true;
	}
	try {
		await project.save();
		if (doneProject && administrators.length > 0) projectDone(administrators, project.name);
		return res.send(project);
	} catch (err) {
		console.log(err);
		return res.status(400).send({ error: getErrorMessage(err) });
	}
};

module.exports.remove = async (req, res) => {
	let project = await Project.findById(req.params.projectId);
	if (!project) return res.status(404).send({ error: "Project not found" });
	const session = await mongoose.startSession();
	await session.startTransaction();
	try {
		await Task.deleteMany({ project: project._id }, { session });
		await Project.deleteOne({ _id: req.params.projectId }, { session });
		await session.commitTransaction();
		await session.endSession();
		return res.status(204).send();
	} catch (err) {
		console.log(err);
		await session.abortTransaction();
		await session.endSession();
		return res.status(400).send({ error: 'A problem occurred while deleting the project' });
	}
};
