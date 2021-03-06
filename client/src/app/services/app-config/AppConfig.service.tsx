import { SnackbarOrigin } from '@material-ui/core/Snackbar';

import EnvService from '../env/Env.service';

class AppAppConfigService extends EnvService {
	/**
	 * variables
	 */
	get AppVariables() {
		return {
			colors: {
				c1: '#000000',
				c2: '#f2f5fa',
				c3: '#272b37',
				c4: '#64b0e5',
				c5: '#2f3443',
				c6: '#ffffff',
				c7: '#202227',
				c8: '#dbdcde',
				c9: '#44b700',
				c10: '#f2db4f'
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
			},
			drawer: {
				width: 260
			}
		};
	}

	/**
	 * services
	 */
	get AppServices() {
		return {
			COMMON: {
				LOGS: `${this.envApiUrl}/frontend-logs`
			},
			AUTH: {
				SIGN_IN: `${this.envApiUrl}/auth/${this.envRealm}/login`,
				AUTO_REFRESH: `${this.envApiUrl}/auth/${this.envRealm}/refresh`
			}
		};
	}

	/**
	 * local storage
	 */
	get AppLocalStorageItems() {
		return {
			JWTAccessToken: 'robotise_jwt_access_token',
			ThemePalette: 'robotise_theme_palette',
			DrawerState: 'robotise_drawer_state'
		};
	}

	/**
	 * session storage
	 */
	get AppSessionStorageItems() {
		return {
			JWTAccessToken: 'robotise_jwt_access_token'
		};
	}

	/**
	 * images URLs
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
			},
			avatar: {
				path: '/assets/svg/avatars/avatar.svg',
				name: 'avatar'
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
}
const instance = new AppAppConfigService();
export default instance;
