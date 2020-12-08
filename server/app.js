const express = require("express");
const mongoose = require("mongoose");
const cors = require("./middleware/cors.js");
const errorHandler = require("./middleware/errorMiddleware.js");
const config = require("config");
const updateDbRouter = require("./routes/update.db.routes.js");
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const companyRouter = require("./routes/company.routes.js");

// Initialize app.
const app = express();

// Add middleware.
app.use(cors);
app.use(express.json({ extended: true }));

// Add routes middleware.
app.use("/api/update-db", updateDbRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/company", companyRouter);

// Handling of errors has to be the last middleware(thats why we don't call next anywhere inside it),
// because we are sending the user a final response.
app.use(errorHandler);

// Connect to db.
(async function connectDb() {
	try {
		mongoose.connect(config.get("mongoUri"), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	} catch (e) {
		console.log("Server error: ", e.message);
		process.exit(1);
	}
})();

// Start server.
const PORT = config.get("port") || 5000;
app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
