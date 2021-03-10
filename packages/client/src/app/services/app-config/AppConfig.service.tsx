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
				c1: '#333435', // dark: 	body/content
				c2: '#383a3c', // dark:		paper
				c3: '#2e2e31', // dark: 	box-shadow

				c4: '#f2f5fa', // light: 	body/content
				c5: '#ffffff', // light: 	paper
				c6: '#dbdcde', // light: 	box-shadow

				c7: '#171a20', // black
				c8: '#393c41', // anthrazit
				c9: '#26aee4', // blue (robotise)

				c10: '#44b700', // icon: 	dot
				c11: '#f2db4f' // icon: 	sun
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
