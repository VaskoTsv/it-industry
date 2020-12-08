const { validationResult } = require("express-validator");
const ApiError = require("../error/ApiError");
const AuthService = require("../services/AuthService");

class AuthController {
	async registration(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// Get only the first error from the errors list.
			const error = errors.errors[0];
			return next(ApiError.badRequest(error.msg));
		}

		try {
			await AuthService.registration(req.body);
		} catch (err) {
			// Let the errorMiddleware handle the error.
			return next(err);
		}

		return res.json({ message: "Registration is successful!" });
	}

	async login(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// Get only the first error from the errors list.
			const error = errors.errors[0];
			return next(ApiError.badRequest(error.msg));
		}

		let response = null;
		try {
			response = await AuthService.login(req.body);
		} catch (err) {
			// Let the errorMiddleware handle the error.
			return next(err);
		}

		return res.json(response);
	}
}

module.exports = new AuthController();
