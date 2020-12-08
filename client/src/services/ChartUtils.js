import { TRANSLATED_CITIES } from "../constants.js";
import Chart from "chart.js";
import { _cyan_, _green_, _lightRed_, _orange_, _purple_ } from "../components/styles/utils.js";

export class ChartUtils {
	static createChart({ element, type, chartData, dataset, options }) {
		const { labels } = chartData;

		if (!element) {
			throw new Error("Element property is mandatory!");
		}

		return new Chart(element, {
			type: type || horizontalBar,
			data: {
				labels: [...labels],
				datasets: [dataset],
			},
			options: options,
		});
	}

	static getBarChartData(statistics, filters) {
		const { comparer, compared } = statistics;
		const comparerCityFilter = filters.comparer;
		const comparedCityFilter = filters.compared;

		const formattedData = {
			labels: [],
			data: [],
			colors: [_lightRed_, _lightRed_, _orange_, _orange_, _purple_, _purple_, _cyan_, _cyan_, _green_, _green_],
		};

		for (const [key, value] of Object.entries(comparer.stats)) {
			const comparerLabel = `${key} ${TRANSLATED_CITIES[comparerCityFilter]}`;
			const comparerData = value;

			const comparedLabel = `${key} ${TRANSLATED_CITIES[comparedCityFilter]}`;
			const comparedData = compared.stats[key];

			formattedData.labels.push(comparerLabel);
			formattedData.data.push(comparerData);

			formattedData.labels.push(comparedLabel);
			formattedData.data.push(comparedData);
		}

		return formattedData;
	}

	static getDoughnutChartData(comparerName, statistics) {
		const formattedData = {
			labels: [],
			data: [],
			colors: [_lightRed_, _orange_, _purple_, _cyan_, _green_],
		};

		for (const [key, value] of Object.entries(statistics[comparerName].stats)) {
			formattedData.labels.push(key);
			formattedData.data.push(value);
		}

		return formattedData;
	}

	static getBarChartDataset({ data, colors, label }) {
		return {
			label: label,
			data: [...data],
			backgroundColor: [...colors],
			borderColor: [...colors],
			borderWidth: 1,
		};
	}

	static getDoghnutChartDataset({ data, colors, label }) {
		return {
			label: label,
			data: [...data],
			backgroundColor: [...colors],
			borderColor: [...colors],
			borderWidth: 1,
		};
	}

	static getBarChartOptions() {
		return { responsive: true };
	}

	static getDoghnutChartOptions(text) {
		return {
			title: {
				display: true,
				text: text,
				position: "top",
			},
		};
	}
}
