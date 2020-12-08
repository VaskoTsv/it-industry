import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/htpp.hook.js";
import { InputGroup } from "@blueprintjs/core";
import { BASE_URL, COMPANY_SIZE, MAIN_CITIES, PROFIT_SIZE } from "../../constants.js";
import Loader from "../Loader.jsx";
import GoogleMapsLoader from "../GoogleMapsLoader.jsx";
import GoogleMap from "../GoogleMap.jsx";
import Filters from "../Filters.jsx";
import { useSelect } from "../../hooks/select.hook.js";
import CompanyScaleLegend from "../CompanyScaleLegend.jsx";
import { debounce } from "../../utils.js";
import { useMessage } from "../../hooks/message.hook.js";

const debouncedFetch = debounce();

export default function HomePage() {
	const { isLoading, request } = useHttp();
	const { showError } = useMessage();

	const [companies, setCompanies] = useState([]);
	const [nameFilter, setNameFilter] = useState("");

	// Init filter helpers.
	const [cityFilter, renderCityFilter] = useSelect({
		items: MAIN_CITIES,
		title: "By city",
		defaultOption: MAIN_CITIES[1],
		filterableBy: "title",
	});
	const [sizeFilter, renderSizeFilter, clearSizeFilter] = useSelect({
		items: COMPANY_SIZE,
		title: "By size",
		defaultOption: COMPANY_SIZE[3],
	});
	const [profitFilter, renderProfitFilter, clearProfitFilter] = useSelect({
		items: PROFIT_SIZE,
		title: "By profit",
	});

	useEffect(() => {
		debouncedFetch(() => updateCompanies(), 300);
	}, [nameFilter, cityFilter, sizeFilter, profitFilter]);

	const getParams = () => {
		return {
			name: nameFilter,
			city: cityFilter,
			size: sizeFilter,
			profit: profitFilter,
		};
	};

	const updateCompanies = async () => {
		try {
			const response = await request(BASE_URL + "/api/company/list", "POST", { ...getParams() });
			setCompanies(response.companies);
		} catch (e) {
			setCompanies([]);
			if (!e.responseJSON) return;
			showError(e.responseJSON.message);
		}
	};

	const handleClearFilters = () => {
		clearSizeFilter();
		clearProfitFilter();
		setNameFilter("");
	};

	return (
		<React.Fragment>
			<Filters onClear={handleClearFilters}>
				<Filters.Item>{renderCityFilter()}</Filters.Item>
				<Filters.Item>{renderSizeFilter()}</Filters.Item>
				<Filters.Item>{renderProfitFilter()}</Filters.Item>
				<Filters.Item>
					<InputGroup
						type="search"
						large={false}
						placeholder="Search by name..."
						onChange={(e) => setNameFilter(e.target.value)}
						value={nameFilter}
					/>
				</Filters.Item>
			</Filters>
			<CompanyScaleLegend title="Map Legend" />
			<GoogleMapsLoader>
				<GoogleMap city={cityFilter} companies={companies} />
			</GoogleMapsLoader>
			<Loader isLoading={isLoading} />
		</React.Fragment>
	);
}
