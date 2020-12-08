import { newElement } from "../utils.js";

// Singleton Google api loader service,
// making sure we inject the google maps api only once for the entire application.
export const GoogleMapsApiLoader = new (class {
	constructor() {
		this.isScriptAdded = false;
		this.isApiLoaded = false;
		this.pendingCallbacks = [];
		this.options = {
			url: "https://maps.googleapis.com/maps/api/js",
			apiKey: process.env.GOOGLE_API_KEY,
			language: "bg",
			region: "BG",
			scriptElementId: "data-google-api-script",
		};
	}

	loadApi(callback) {
		if (this.isScriptLoaded) {
			callback();
			return;
		}

		this.pendingCallbacks.push(callback);
		if (this.isScriptAdded) return;

		this.isScriptAdded = true;
		this.injectScript(() => {
			for (const callback of this.pendingCallbacks) {
				callback();
			}
			this.customizeGoogleObjects();
			this.pendingCallbacks = [];
			this.isScriptLoaded = true;
		});
	}

	injectScript(callback) {
		const { url, apiKey, language, region, scriptElementId } = this.options;

		window.handleApiLoadedCallback = callback;
		const args = "callback=handleApiLoadedCallback" + `&language=${language}&region=${region}&key=${apiKey}`;
		const script = newElement("script", {
			src: `${url}?${args}`,
			[scriptElementId]: true,
		});
		window.document.body.appendChild(script);
	}

	customizeGoogleObjects() {
		// Attach custom props to Google Marker objects.
		google.maps.Marker.prototype.companyData = null;
	}
})();
