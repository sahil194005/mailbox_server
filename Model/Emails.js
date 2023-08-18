const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const EmailSchema = new mongoose.Schema({
	sender: {
		type: String,
	},
	receiver: {
		type: String,
	},
	subject: {
		type: String,
	},
	body: {
		type: String,
	},
	opened: {
		type: Boolean,
	},
	isDeleted: {
		type: Boolean,
	},
});

module.exports = mongoose.model("emails", EmailSchema);
