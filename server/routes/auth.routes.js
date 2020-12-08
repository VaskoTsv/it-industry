const { Router } = require("express");
const { check } = require("express-validator");
const AuthController = require("../controllers/AuthController");

const router = Router();

router.post(
	"/register",
	[
		check("email", "Please enter valid email").isEmail(),
		check("password", "The minimum password length is 6 symbols").isLength({ min: 6 }),
	],
	AuthController.registration
);
router.post(
	"/login",
	[
		check("email", "Please enter valid email").normalizeEmail().isEmail(),
		check("password", "Please enter password").exists(),
	],
	AuthController.login
);

module.exports = router;
