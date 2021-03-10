import { SnackbarOrigin } from '@material-ui/core/Snackbar';

import EnvService from '../env/Env.service';
import CHANGELOG from './../../../../CHANGELOG.md';

class AppConfigService extends EnvService {
	/**
	 * variables
	 */
	get AppVariables() {
		return {
			colors: {
				c1: '#171a20', // warm black
				c2: '#f2f5fa', // grey
				c3: '#272b37', // royal blue dark
				c4: '#26aee4', // robotise blue
				c5: '#2f3443', // royal blue light
				c6: '#ffffff', // white
				c7: '#202227', // dark: box-shadow
				c8: '#dbdcde', // light: box-shadow
				c9: '#44b700', // avatar: dot
				c10: '#f2db4f' // theme-icon: sun
			}
		};
	}

	/**
	 * general
	 */
	get AppOptions() {
		return {
			fontFamily: {
				Roboto: 'Roboto'
			},
			snackbar: {
				timeout: 6000,
				direction: {
					vertical: 'bottom',
					horizontal: 'left'
				} as SnackbarOrigin
			},
			drawer: {
				width: 260
			},
			authentication: {
				validateBefore: 2 * 60 * 1000 // 2 minutes
			}
		};
	}

	/**
	 * services
	 */
	get AppServices() {
		return {
			COMMON: {
				LOGS: `${this.envApiUrl}/frontend-logs`,
				CHANGELOG
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
			json: {
				Accept: 'application/json'
			},
			form: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
	}
}
const instance = new AppConfigService();
export default instance;
