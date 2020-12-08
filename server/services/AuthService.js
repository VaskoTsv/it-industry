const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

class AuthService {
	async registration(candidate) {
		const { email, password } = candidate;

		const registeredUser = await User.findOne({ email });
		if (registeredUser) {
			throw ApiError.badRequest("This email is already registered!");
		}

		const hashedPassword = await bcrypt.hash(password, 7);
		const user = new User({ email, password: hashedPassword });
		await user.save();
	}

	async login(candidate) {
		const { email, password } = candidate;
		const user = await User.findOne({ email });

		if (!user) {
			throw ApiError.badRequest("There is no user registered with this email!");
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw ApiError.badRequest("Wrong password!");
		}

		const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), { expiresIn: "24h" });

		return { userId: user.id, token };
	}
}

module.exports = new AuthService();
