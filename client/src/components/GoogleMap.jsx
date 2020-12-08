import React, { useEffect, useRef, useState } from "react";
import { __GoogleMapContainer } from "./styles/google-map.js";
import { BASE_URL, SOFIA_CENTER_LOCATION } from "../constants.js";
import { useHttp } from "../hooks/htpp.hook.js";
import { useAuth } from "../hooks/auth.hook.js";
import { useMessage } from "../hooks/message.hook.js";
import {
	createGoogleMap,
	getCoordinatesFromAddress,
	googleInfoWindow,
	addMarkersEventListeners,
	addMarkersToMap,
	clearMarkersFromMap,
	clearMarkersEventListeners,
	infoWindowEventsUtil,
	getMarkerForEachCompany,
} from "../services/GoogleMapUtils.js";

export default function GoogleMap({ city, companies }) {
	const auth = useAuth();
	const { request } = useHttp();
	const { showSuccess, showError } = useMessage();

	const mapRef = useRef();
	const [map, setMap] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [infoWindow, setInfoWindow] = useState(null);

	useEffect(() => {
		initializeComponent();
	}, []);

	useEffect(() => {
		updateMapPosition();
	}, [city]);

	useEffect(() => {
		updateMarkers();
	}, [map, companies]);

	useEffect(() => {
		addMarkersToMap();
		addMarkersEventListeners(markers, [
			{
				event: "click",
				handler: (marker) => markerClickHandler(marker),
			},
		]);
	}, [markers]);

	const initializeComponent = async () => {
		const cityCoords = await getCoordinatesFromAddress(city);
		setMap(createGoogleMap({ element: mapRef.current, center: cityCoords || SOFIA_CENTER_LOCATION }));
		setInfoWindow(googleInfoWindow());
	};

	const updateMapPosition = async () => {
		if (!map) return;
		const cityCoords = await getCoordinatesFromAddress(city);
		map.setCenter({ lat: cityCoords.lat, lng: cityCoords.lng });
	};

	const updateMarkers = () => {
		// Clear old markers.
		clearMarkersFromMap(markers);
		clearMarkersEventListeners(markers);
		setMarkers([]);
		// Set new markers.
		setMarkers(getMarkerForEachCompany(companies, map));
	};

	const markerClickHandler = (marker) => {
		const { companyData: company } = marker;
		infoWindowEventsUtil({ infoWindow, company, auth, url: BASE_URL, request, showSuccess, showError });
		infoWindow.setContent(renderCompanyInfo(company));
		infoWindow.open(map, marker);
	};

	const renderCompanyInfo = (company) => {
		return `
            <h3>${company.name}</h3>
            <h5>Eik: ${company.eik}</h5>
            <h5>Employees: ${company.employees_count}</h5>
            <h5>Revenue: ${company.revenue_formatted} BGN</h5>
            <h5>Profit: ${company.profit_formatted} BGN</h5>
            <button id="addBookmark">Add to bookmarks</button>
        `;
	};

	return (
		<__GoogleMapContainer>
			<div ref={mapRef} className="google-map" />
		</__GoogleMapContainer>
	);
}
