const nodemailer = require("nodemailer");
const { welcomeTemplate, projectDoneTemplate } = require("./templates");

const smtpTransport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_SENDER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const mailOptionsGlobal = {
	to: "",
	from: `Slabcode <${process.env.EMAIL_SENDER}>`,
	subject: "",
	html: "",
	attachments: [
		{
			filename: "logo.png",
			path: "./logo.png",
			cid: "logo.png",
		},
	],
};

module.exports.welcome = (email, username, password) => {
	let mailOptions = { ...mailOptionsGlobal };
	mailOptions.to = email;
	mailOptions.subject = "Bienvenido a Slabcode";
	mailOptions.html = welcomeTemplate(username, password);
	smtpTransport.sendMail(mailOptions, function (err) {
		if (err) return console.error(err);
		console.log("Welcome message sended");
	});
};

module.exports.projectDone = (administrators, projectName) => {
	let mailOptions = { ...mailOptionsGlobal };
	mailOptions.to = administrators;
	mailOptions.subject = `El proyecto ${projectName} ha sido culminado`;
	mailOptions.html = projectDoneTemplate(projectName);
	smtpTransport.sendMail(mailOptions, function (err) {
		if (err) return console.error(err);
		console.log("Project done message sended");
	});
};
