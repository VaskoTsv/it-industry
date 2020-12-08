import React, { useEffect, useState } from "react";
import { GoogleMapsApiLoader } from "../services/GoogleMapsApiLoader.js";

export default function GoogleMapsLoader({ children }) {
    const [isApiLoaded, setIsApiLoaded] = useState(false);

	useEffect(() => {
		GoogleMapsApiLoader.loadApi(() => setIsApiLoaded(true));
	}, []);

	return !isApiLoaded ? <h1>Loading map...</h1> : <React.Fragment>{children}</React.Fragment>;
}
