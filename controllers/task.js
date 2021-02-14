const Project = require("../models/project");
const Task = require("../models/task");
const { getErrorMessage } = require("../helpers/middleware");

module.exports.create = async (req, res) => {
	const project = await Project.findById(req.body.project);
	if (!project) return res.status(404).send({ error: "Project not found" });
	try {
		const execution_date = new Date(req.body.execution_date);
		if (project.end_date && execution_date > project.end_date)
			return res.status(400).send({ error: 'Execution date exceeds project completion' });
		let task = new Task(req.body);
		await task.save();
		return res.status(201).send(task);
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
	if (req.query.project) qs.project = req.query.project;
	const tasks = await Task.find(qs);
	return res.status(200).send(tasks);
};

module.exports.getOne = async (req, res) => {
	let task = await Task.findById(req.params.taskId);
	if (!task) return res.status(404).send({ error: "Task not found" });
	return res.send(task);
};

module.exports.update = async (req, res) => {
	let task = await Task.findOne({ _id: req.params.taskId }, {}, { populate: { path: "project", select: "end_date" } });
	if (!task) return res.status(404).send({ error: "Task not found" });
	task.name = req.body.name || task.name;
	task.description = req.body.description || task.description;
	task.status = req.body.status || task.status;
	if (req.body.execution_date) {
		try {
			const execution_date = new Date(req.body.execution_date);
			if (task.project.end_date && execution_date > task.project.end_date)
				return res.status(400).send({ error: 'Execution date exceeds project completion' });
			task.execution_date = execution_date;
		} catch (err) {
			console.log(err);
			return res.status(400).send({ error: getErrorMessage(err) });
		}
	}
	try {
		await task.save();
		return res.send(task);
	} catch (err) {
		console.log(err);
		return res.status(400).send({ error: getErrorMessage(err) });
	}
};

module.exports.remove = async (req, res) => {
	try {
		let task_to_delete = await Task.findOneAndDelete({ _id: req.params.taskId });
		if (!task_to_delete) return res.status(404).send({ error: "Task not found" });
		else return res.status(204).send();
	} catch (err) {
		return res.status(400).send({ error: getErrorMessage(err) });
	}
};
