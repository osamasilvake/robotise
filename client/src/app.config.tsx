// app
import ENV from './environment';

// general
export const AppOptions = {};

// services
export const AppServices = {
	AUTH: {
		SIGN_IN: {
			URL: `${ENV().REST_API}/login`
		}
	}
};
