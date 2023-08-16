const Express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRoute = require("./Route/Users");
const connectDB = require("./DB/connect");

const app = Express();
app.use(cors());

app.use(bodyParser.json());
app.use("/users", UserRoute);

const PORT = process.env.PORT || 3005;
async function serverStart() {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`server listening on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
}
serverStart();
