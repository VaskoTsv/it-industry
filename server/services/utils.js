const Company = require("../models/Company.js");

const CompanyServiceUtils = () => {
	const getFilterValues = (stringValue) => {
		// Receives the filter min max values as a string in the following format 'min-max',
		// and returns the min and max values.
		const values = stringValue.split("-");
		return { min: parseInt(values[0]), max: parseInt(values[1]) };
	};

	const getFilteredStats = async ({ filters, filterBy, initialStats, options }) => {
		const stats = { ...initialStats };
	
		for (const [key, value] of Object.entries(options)) {
			const { min, max } = getFilterValues(options[key]);
	
			filters[filterBy] = { $gte: min, $lte: max };
			const results = await Company.find(filters);
	
			stats[key] = results.length;
		}
	
		return stats;
	};

	const getConstants = () => {
		return {
			COMPANY_SIZE_OPTIONS: {
				Startup: '0-15',
				Small: '16-50',
				Medium: '51-100',
				Big: '101-300',
				Large: '301-10000',
			},
			COMPANY_PROFIT_OPTIONS: {
				Broke: '0-0',
				Poor: '0-60000',
				Normal: '60000-200000',
				Rich: '200000-600000',
				'Very Rich': '600000-10000000',
			},
		}
	}

	return {
		getFilterValues,
		getFilteredStats,
		getConstants
	}
}

module.exports = {
    CompanyServiceUtils,
}