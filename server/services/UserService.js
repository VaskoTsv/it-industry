const User = require("../models/User.js");
const Company = require("../models/Company.js");
const ApiError = require("../error/ApiError");

class UserService {
	async getUser(id) {
		const user = await User.findById(id);

		if (!user) {
			throw new ApiError.badRequest("There is no such user!");
		}

		return user;
	}

	async getUserBookmarks(user) {
		let bookmarks = [];

		if (!user.bookmarked_companies || !user.bookmarked_companies.length) {
			return bookmarks;
		}

		bookmarks = await Company.find().where("_id").in(user.bookmarked_companies);
		return bookmarks;
	}

	async addToBookmarks(userId, companyId) {
		const user = await User.findById(userId);
		const company = await Company.findById(companyId);

		if (!user || !company) {
			throw new ApiError.badRequest("There is no such user or company!");
		}

		const isAlreadyBookmarked = Boolean(
			user.bookmarked_companies.findIndex((cmp) => String(cmp) === companyId) !== -1
		);
		if (isAlreadyBookmarked) {
			throw new ApiError.badRequest("This company is already added to bookmarks!");
		}

		await user.update({
			bookmarked_companies: [...user.bookmarked_companies, company],
		});

		return user;
	}

	async removeFromBookmarks(userId, companyId) {
		const user = await User.findById(userId);

		if (!user) {
			throw new ApiError.badRequest("No such user!");
		}

		const removeCandidatePosition = user.bookmarked_companies.findIndex((c) => String(c) === companyId);
		if (removeCandidatePosition === -1) {
			throw new ApiError.badRequest("There is no such company in your bookmarks!");
		}

		user.bookmarked_companies.splice(removeCandidatePosition, 1);
		await user.update({ bookmarked_companies: user.bookmarked_companies });

		return user;
	}
}

module.exports = new UserService();
