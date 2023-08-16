const UserSchema = require("../Model/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SignUp = async (req, res) => {
	try {
		const { email, password } = req.body;
		let existingUser = await UserSchema.findOne({
			email: email,
		});
		if (existingUser)
			res.status(403).json({
				msg: "email already exists",
				success: false,
			});
		else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			const response = await UserSchema.create({
				...req.body,
				password: hashedPassword,
			});

			res.status(201).json({
				msg: "successfully Signed Up",
				success: true,
			});
		}
	} catch (error) {
		console.log(error);
		res.json({
			msg: "Something went wrong",
			success: false,
			 error: error,
		});
	}
};

const generateToken = (id, email) => {
	let token = jwt.sign({ userId: id, userEmail: email }, process.env.JWT_SECRET);
	return token;
};

const Login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await UserSchema.findOne({
			email: email,
		});

		if (!existingUser)
			res.status(401).json({
				msg: "No account with this email",
				success: false,
			});
		else {
			let passwordMatch = await bcrypt.compare(password, existingUser.password);
			if (!passwordMatch) res.status(401).json({ msg: "Wrong password", success: false });
			else
				res.status(201).json({
					msg: "successfully logged in",
					success: true,
					token: generateToken(existingUser._id, existingUser.email),
				});
		}
	} catch (error) {
		console.log(error);
		res.staus(401).json({
			msg: "Not Authorized",
			error: error,
			success: false,
		});
	}
};

module.exports = { SignUp, Login };
