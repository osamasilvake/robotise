import { SnackbarOrigin } from '@material-ui/core/Snackbar';

import EnvService from './env.service';

class ConfigService extends EnvService {
	/**
	 * variables
	 */
	get AppVariables() {
		return {
			colors: {
				c1: '#000000',
				c2: '#ffffff',
				c3: '#262933',
				c4: '#64b0e5'
			}
		};
	}

	/**
	 * general
	 */
	get AppOptions() {
		const direction: SnackbarOrigin = {
			vertical: 'bottom',
			horizontal: 'left'
		};

		return {
			fontFamily: {
				Roboto: 'Roboto'
			},
			snackbar: {
				timeout: 6000,
				direction
			}
		};
	}

	/**
	 * services
	 */
	get AppServices() {
		return {
			AUTH: {
				SIGN_IN: `${this.envApiUrl}/auth/${this.envRealm}/login`
			}
		};
	}

	/**
	 * local storage
	 */
	get AppLocalStorageItems() {
		return {
			JWTAccessTokken: 'jwt_access_token'
		};
	}

	/**
	 * images
	 */
	get AppImageURLs() {
		return {
			logo: {
				icon: '/assets/svg/logos/robotise-icon.svg',
				name: '/assets/svg/logos/robotise-name.svg'
			},
			robotise: {
				path: '/assets/images/robotise/',
				format: '.jpg'
			}
		};
	}

	/**
	 * headers for a request to backend
	 */
	get AppRequestHeaders() {
		return {
			get: {
				Accept: 'application/json'
			},
			post: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
	}

	/**
	 * REST API config
	 */
	get AppRESTAPIConfig() {
		return {
			get: {
				retry: 3,
				timeout: 10 * 1000 // 10 seconds
			},
			post: {
				timeout: 20 * 1000 // 20 seconds
			}
		};
	}
}
const instance = new ConfigService();
export default instance;
