// app
import ENV from './environment';

// variables
export const AppVariables = {
	colors: {
		c1: '#000000',
		c2: '#ffffff',
		c3: '#262933',
		c4: '#64b0e5'
	}
};

// general
export const AppOptions = {
	author: 'Robotise AG',
	snackbar: {
		timeout: 6000,
		direction: {
			vertical: 'bottom',
			horizontal: 'left'
		}
	}
};

// services
export const AppServices = {
	AUTH: {
		SIGN_IN: {
			URL: `${ENV().REST_API}/login`
		}
	}
};

// local storage
export const localStorageItems = {
	JWTAccessTokken: 'jwt_access_token'
};

// images
export const imageURLs = {
	logoIcon: 'assets/svg/logos/robotise-icon.svg',
	logoName: 'assets/svg/logos/robotise-name.svg'
};
