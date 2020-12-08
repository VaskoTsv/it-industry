import styled from "styled-components";
import { _purple_, _white_, calculateRem } from "./utils.js";

export const __Navigation = styled.div`
	background-color: ${_purple_};
	color: ${_white_};
`;

export const __NavigationContainer = styled.div`
	margin: 0 auto;
	width: ${calculateRem(960)};
`;

export const __NavigationGroup = styled.div`
	a {
		color: ${_white_};
		text-decoration: none;
	}

	button.bp3-button.bp3-minimal {
		color: ${_white_};

		a {
			color: ${_white_};
		}

		:before {
			color: ${_white_};
		}

		:focus {
			outline: none;
		}
	}

	.bp3-navbar-divider {
		border-left: 1px solid ${_white_};
		opacity: 0.4;
	}
`;

export const __NavigationLogo = styled.div`
	height: 40px;
	cursor: pointer;

	img {
		height: 100%;
	}
`;

export const __NavigationTitle = styled.div`
	cursor: pointer;
`;
