import React, { useEffect, useRef, useState } from "react";
import { useSelect } from "../../hooks/select.hook.js";
import { BASE_URL, COMPANIES_COMPARE_TYPE, MAIN_CITIES, TRANSLATED_CITIES } from "../../constants.js";
import Filters from "../Filters.jsx";
import { useHttp } from "../../hooks/htpp.hook.js";
import Loader from "../Loader.jsx";
import { useMessage } from "../../hooks/message.hook.js";
import { ChartUtils } from "../../services/ChartUtils.js";

const INITIAL_STATISTICS = {
	comparer: null,
	compared: null,
	compareType: null,
};

export default function ComparerPage() {
	const { isLoading, request } = useHttp();
	const { showError } = useMessage();

	const comparerChartRef = useRef();
	const comparedChartRef = useRef();
	const barChartRef = useRef();

	const [statistics, setStatistics] = useState(INITIAL_STATISTICS);
	const [comparerChart, setComparerChart] = useState(() => null);
	const [comparedChart, setComparedChart] = useState(() => null);
	const [barChart, setBarChart] = useState(() => null);

	// Init filter helpers.
	const [comparerCityFilter, renderComparerCityFilter] = useSelect({
		items: MAIN_CITIES,
		title: "By city",
		defaultOption: MAIN_CITIES[0],
		filterableBy: "title",
	});
	const [comparedCityFilter, renderComparedCityFilter] = useSelect({
		items: MAIN_CITIES,
		title: "By city",
		defaultOption: MAIN_CITIES[1],
		filterableBy: "title",
	});
	const [compareTypeFilter, renderCompareTypeFilter] = useSelect({
		items: COMPANIES_COMPARE_TYPE,
		defaultOption: COMPANIES_COMPARE_TYPE[0],
	});

	useEffect(() => {
		updateStatistics();
	}, [comparerCityFilter, comparedCityFilter, compareTypeFilter]);

	useEffect(() => {
		// Remove old charts.
		destroyOldCharts();
		// Draw new charts.
		initBarChart();
		initDoughnutChart({
			element: comparerChartRef.current,
			dataName: "comparer",
			data: statistics.comparer,
			setData: setComparerChart,
			city: comparerCityFilter,
		});
		initDoughnutChart({
			element: comparedChartRef.current,
			dataName: "compared",
			data: statistics.compared,
			setData: setComparedChart,
			city: comparedCityFilter,
		});
	}, [statistics]);

	const updateStatistics = async () => {
		const statistics = await getStatistics();
		setStatistics(statistics);
	};

	const getStatistics = async () => {
		const getParams = () => {
			return {
				compare: comparerCityFilter,
				compareTo: comparedCityFilter,
				type: compareTypeFilter,
			};
		};

		try {
			return await request(BASE_URL + "/api/company/list/statistics", "POST", { ...getParams() });
		} catch (e) {
			if (!e.responseJSON) return;
			showError(e.responseJSON.message);
		}
	};

	const destroyOldCharts = () => {
		if (barChart) barChart.destroy();
		if (comparerChart) comparerChart.destroy();
		if (comparedChart) comparedChart.destroy();
	};

	const initBarChart = () => {
		const element = barChartRef.current;
		if (!element || !statistics.comparer || !statistics.compared) return;

		const chartData = ChartUtils.getBarChartData(statistics, {
			comparer: comparerCityFilter,
			compared: comparedCityFilter,
		});
		const chart = ChartUtils.createChart({
			element,
			type: "horizontalBar",
			chartData,
			dataset: ChartUtils.getBarChartDataset({
				label: "Quantity comparison",
				data: chartData.data,
				colors: chartData.colors,
			}),
			options: ChartUtils.getBarChartOptions(),
		});

		setBarChart(chart);
	};

	const initDoughnutChart = ({ element, dataName, data, setData, city }) => {
		if (!element || !data) return;

		const chartData = ChartUtils.getDoughnutChartData(dataName, statistics);
		const chart = ChartUtils.createChart({
			element,
			type: "doughnut",
			chartData,
			dataset: ChartUtils.getDoghnutChartDataset({
				label: "Quantity comparison",
				data: chartData.data,
				colors: chartData.colors,
			}),
			options: ChartUtils.getDoghnutChartOptions(`${TRANSLATED_CITIES[city]} industry overview`),
		});

		setData(chart);
	};

	return (
		<React.Fragment>
			<Filters title="City comparer" hideClearButton={true}>
				<Filters.Item label="Compare">{renderComparerCityFilter()}</Filters.Item>
				<Filters.Item label="with">{renderComparedCityFilter()}</Filters.Item>
				<Filters.Item label="by">{renderCompareTypeFilter()}</Filters.Item>
			</Filters>
			<canvas ref={barChartRef} />
			<canvas ref={comparerChartRef} />
			<canvas ref={comparedChartRef} />
			<Loader isLoading={isLoading} />
		</React.Fragment>
	);
}
