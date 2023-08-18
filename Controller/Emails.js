const EmailSchema = require("../Model/Emails");

const SendEmail = async (req, res) => {
	try {
		let finalObj = { sender: req.User.email, isDeleted: false, ...req.body };
		await EmailSchema.create(finalObj);
		res.status(201).json({ msg: "mail sent", success: true });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "cannot send mail", success: false });
	}
};

const getEmail = async (req, res) => {
	try {
		const userEmail = req.User.email;
		const data = await EmailSchema.find({ receiver: userEmail });
		let arr = data.filter((item) => item.isDeleted === false);
		console.log(data);
		res.status(201).json({ msg: "got all mails", data: arr, success: true });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "cannot get the mails", success: false });
	}
};

const getSingleEmail = async (req, res) => {
	try {
		await EmailSchema.findOneAndUpdate({ _id: req.params.id }, { opened: true });
		const mail = await EmailSchema.findOne({ _id: req.params.id });
		res.status(201).json({ msg: "got the mail", data: mail, success: true });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "cannot get the mails", success: false });
	}
};

const DeleteMail = async (req, res) => {
	try {
		await EmailSchema.findOneAndUpdate({ _id: req.params.id }, { isDeleted: true });
		res.status(201).json({ msg: "mail deleted", success: true });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "cannot delete mail", success: false });
	}
};

const getSentMail = async (req, res) => {
	try {
		const userEmail = req.User.email;
		const data = await EmailSchema.find({ sender: userEmail });
		res.status(201).json({ msg: "got all mails", data: data, success: true });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "cannot get the mails", success: false });
	}
};

module.exports = { SendEmail, getEmail, getSingleEmail, DeleteMail,getSentMail };
