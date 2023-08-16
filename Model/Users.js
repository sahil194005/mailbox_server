
const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
	password: {
		type: String,
	},
});

module.exports = mongoose.model("users", UserSchema);
