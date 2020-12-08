const CompanyService = require("../services/CompanyService");

class CompanyController {
	async list(req, res, next) {
		const { name, city, size, profit } = req.body;

		let filteredCompanies;
		try {
			filteredCompanies = await CompanyService.list({ name, city, size, profit });
		} catch (err) {
			return next(err);
		}

		return res.json({ companies: filteredCompanies });
	}

	async statistics(req, res, next) {
		const { compare, compareTo, type } = req.body;

		let comparisonStats = null;
		try {
			comparisonStats = await CompanyService.statistics({ compare, compareTo, type });
		} catch (err) {
			return next(ApiError.badRequest('Error on generating comparison statistics!'));
		}

		return res.json(comparisonStats);
	}
}

module.exports = new CompanyController();
