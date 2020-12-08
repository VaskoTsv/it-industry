const Company = require("../models/Company.js");
const ApiError = require("../error/ApiError.js");
const { CompanyServiceUtils } = require("./utils.js");
const { MAX_RESPONSE_SIZE } = require("../constants.js");

const COMPARE_TYPES = {
	size: "size",
	profit: "profit",
};

const INITIAL_STATS = {
	size: { Startup: null, Small: null, Medium: null, Big: null, Large: null },
	profit: { Broke: null, Poor: null, Normal: null, Rich: null, "Very Rich": null },
};

class CompanyService {
	constructor(utils) {
		this.utils = utils;
		this.constants = utils.getConstants();
	}

	async list(filters) {
		let companies = null;

		const { name, city, size, profit } = filters;

		const filterBy = {
			name: { $regex: name, $options: "i" },
			city: { $regex: city, $options: "i" },
		};

		if (size) {
			const { min, max } = this.utils.getFilterValues(size);
			filterBy["employees_count"] = { $gte: min, $lte: max };
		}

		if (profit) {
			const { min, max } = this.utils.getFilterValues(profit);
			filterBy["profit"] = { $gte: min, $lte: max };
		}

		companies = await Company.find(filterBy).exec();

		if (companies.length > MAX_RESPONSE_SIZE) {
			throw new ApiError(413, "There are too much results to be displayed! Please apply more filters!");
		}

		return companies;
	}

	async statistics(filters) {
		let comparisonStats = null;

		const { compare, compareTo, type } = filters;

		// The resulting stats for each city that we are comparing.
		const comparer = { city: "", stats: null };
		const compared = { city: "", stats: null };

		// The applied filters for each of the cities.
		const compareFilters = { city: { $regex: compare, $options: "i" } };
		const compareToFilters = { city: { $regex: compareTo, $options: "i" } };

		if (type === COMPARE_TYPES.size) {
			comparer.city = compare;
			comparer.stats = await this.utils.getFilteredStats({
				filters: compareFilters,
				filterBy: "employees_count",
				initialStats: INITIAL_STATS.size,
				options: this.constants.COMPANY_SIZE_OPTIONS,
			});

			compared.city = compareTo;
			compared.stats = await this.utils.getFilteredStats({
				filters: compareToFilters,
				filterBy: "employees_count",
				initialStats: INITIAL_STATS.size,
				options: this.constants.COMPANY_SIZE_OPTIONS,
			});

			comparisonStats = { comparer, compared, compareType: "size" };
		}

		if (type === COMPARE_TYPES.profit) {
			comparer.city = compare;
			comparer.stats = await this.utils.getFilteredStats({
				filters: compareFilters,
				filterBy: "profit",
				initialStats: INITIAL_STATS.profit,
				options: this.constants.COMPANY_PROFIT_OPTIONS,
			});

			compared.city = compareTo;
			compared.stats = await this.utils.getFilteredStats({
				filters: compareToFilters,
				filterBy: "profit",
				initialStats: INITIAL_STATS.profit,
				options: this.constants.COMPANY_PROFIT_OPTIONS,
			});

			comparisonStats = { comparer, compared, compareType: "profit" };
		}

		return comparisonStats;
	}
}

module.exports = new CompanyService(CompanyServiceUtils());
