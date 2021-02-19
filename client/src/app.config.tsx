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
	company: {
		name: 'Robotise AG',
		link: 'https://robotise.eu/de/'
	},
	fontFamily: {
		Roboto: 'Roboto'
	},
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
export const AppLocalStorageItems = {
	JWTAccessTokken: 'jwt_access_token'
};

// images
export const AppImageURLs = {
	logo: {
		icon: '/assets/svg/logos/robotise-icon.svg',
		name: '/assets/svg/logos/robotise-name.svg'
	},
	robotise: {
		path: '/assets/images/robotise/',
		format: '.jpg'
	}
};
