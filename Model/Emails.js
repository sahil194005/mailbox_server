
const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
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
	
});

module.exports = mongoose.model("emails", EmailSchema);
