const { BaseUserSerializer } = require("../serializers/user.serializers.js");
const UserService = require("../services/UserService");

class UserController {
	async getUser(req, res, next) {
		const { userId } = req.params;

		let user = null;
		let bookmarks = [];
		try {
			user = await UserService.getUser(userId);
			bookmarks = await UserService.getUserBookmarks(user);
		} catch (err) {
			return next(err);
		}

		const serializedUser = BaseUserSerializer(user, bookmarks);
		return res.json(serializedUser);
	}

	async addToBookmarks(req, res, next) {
		const { userId, companyId } = req.params;

		let user = null;
		try {
			user = await UserService.addToBookmarks(userId, companyId);
		} catch (err) {
			return next(err);
		}

		return res.json({ user, message: "The company is added to your bookmarks!" });
	}

	async removeFromBookmarks(req, res, next) {
		const { userId, companyId } = req.params;

		let user = null;
		try {
			user = await UserService.removeFromBookmarks(userId, companyId);
		} catch (error) {
			return next(error);
		}
		const bookmarks = await UserService.getUserBookmarks(user);

		return res.json({
			user: BaseUserSerializer(user, bookmarks),
			message: "The company is removed from your bookmarks!",
		});
	}
}

module.exports = new UserController();
