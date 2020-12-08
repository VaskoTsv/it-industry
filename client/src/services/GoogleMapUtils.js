import { BULGARIA_BOUNDS, COMPANY_SCALE } from "../constants";

export const createGoogleMap = (options) => {
	const { element, center, bounds = BULGARIA_BOUNDS, zoom = 12, scrollwheel = true } = options;

	return new google.maps.Map(element, {
		zoom,
		center: googleLatLng(center),
		scrollwheel,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		draggableCursor: "default",
		restriction: {
			latLngBounds: bounds,
			strictBounds: true,
		},
	});
};

export const getCoordinatesFromAddress = (address) => {
	if (!address) {
		throw new Error("Address argument is mandatory!");
	}

	const geocoder = googleGeocoder();
	return new Promise((resolve) => {
		geocoder.geocode({ address: address }, function (results, status) {
			if (status !== "OK") resolve(null);

			const pos = results[0].geometry.location;
			resolve({
				lat: pos.lat(),
				lng: pos.lng(),
			});
		});
	});
};

export const createGoogleMarker = (options) => {
	const { map, position, iconOptions } = options;
	return new google.maps.Marker({ map, position, icon: iconOptions });
};

export const infoWindowEventsUtil = (args) => {
	const { infoWindow, company, auth, url, request, showSuccess, showError } = args;

	const attachEventListeners = () => {
		google.maps.event.addListener(infoWindow, "domready", () => {
			const button = document.getElementById("addBookmark");
			if (!button) return;
			attachBookmarkButtonListener(button, auth, company);
		});
	};

	const clearEventListeners = () => {
		google.maps.event.addListener(infoWindow, "closeclick", () => {
			google.maps.event.clearInstanceListeners(infoWindow);
		});
	};

	const attachBookmarkButtonListener = (button, auth, company) => {
		google.maps.event.addDomListener(button, "click", async () => {
			try {
				const response = await request(`${url}/api/users/${auth.userId}/bookmarked/${company._id}`, "PUT");
				showSuccess(response.message);
			} catch (e) {
				if (!e.responseJSON) return;
				showError(e.responseJSON.message);
			}
		});
	};

	clearEventListeners();
	attachEventListeners();
};

export const getMarkerForEachCompany = (companies, map) => {
	const newMarkers = [];

	companies.forEach((company) => {
		const { lat, lng } = company;
		const { scale, color } = getCompanyScaleOptions(company);

		const marker = createGoogleMarker({
			map: map,
			position: googleLatLng({ lat: parseFloat(lat), lng: parseFloat(lng) }),
			iconOptions: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: scale,
				fillColor: color,
				fillOpacity: 0.4,
				strokeWeight: 0.4,
			},
		});
		marker.companyData = { ...company };

		newMarkers.push(marker);
	});

	return newMarkers;
};

export const addMarkersToMap = (markers = [], map) => {
	if (!markers.length) return;
	markers.forEach((marker) => marker.setMap(map));
};

export const clearMarkersFromMap = (markers = []) => {
	if (!markers.length) return;
	markers.forEach((marker) => marker.setMap(null));
};

export const addMarkersEventListeners = (markers = [], listeners) => {
	markers.forEach((marker) => {
		listeners.forEach((listener) => {
			const { event, handler } = listener;
			marker.addListener(event, () => handler(marker));
		});
	});
};

export const clearMarkersEventListeners = (markers = []) => {
	if (!markers.length) return;
	markers.forEach((marker) => google.maps.event.clearInstanceListeners(marker));
};

export const googleGeocoder = () => new google.maps.Geocoder();

export const googleLatLng = (pos) => new google.maps.LatLng(pos);

export const googleInfoWindow = () => new google.maps.InfoWindow();

const getCompanyScaleOptions = (company) => {
	// Get company scale options, based on the number of employees working for the company.
	let scale;
	const employeesCount = parseInt(company.employees_count);

	switch (true) {
		case employeesCount < 15:
			scale = COMPANY_SCALE.Startup;
			break;
		case employeesCount > 15 && employeesCount <= 50:
			scale = COMPANY_SCALE.Small;
			break;
		case employeesCount > 50 && employeesCount <= 100:
			scale = COMPANY_SCALE.Medium;
			break;
		case employeesCount > 100 && employeesCount <= 300:
			scale = COMPANY_SCALE.Big;
			break;
		case employeesCount > 300:
			scale = COMPANY_SCALE.Large;
			break;
		default:
			scale = COMPANY_SCALE.Startup;
	}

	return scale;
}
