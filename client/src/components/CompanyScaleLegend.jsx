import React from "react";
import { __CompanyScaleLegendContainer } from "./styles/company-scale-legend.js";

export default function CompanyScaleLegend({title}) {
	return (
		<__CompanyScaleLegendContainer>
			<span className="legend">{title || "Legend"}: </span>
			<span className="startup">Startup</span>
			<span className="small">Small</span>
			<span className="medium">Medium</span>
			<span className="big">Big</span>
			<span className="large">Large</span>
		</__CompanyScaleLegendContainer>
	);
}
