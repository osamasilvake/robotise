import appRoutes from '../../routes/app-routes';
import EnvService from '../env/Env.service';
import CHANGE_LOG from './../../../../CHANGELOG.md';

class AppConfigService extends EnvService {
	/**
	 * variables
	 */
	get AppVariables() {
		return {
			colors: {
				c1: '#333435', // dark: 			body/content
				c2: '#383a3c', // dark:				paper
				c3: '#2e2e31', // dark: 			box-shadow

				c4: '#ffffff', // light: 			body/content
				c5: '#eeeeee ', // light: 			paper
				c6: '#dbdcde', // light: 			box-shadow

				c7: '#ffffff', // dark: 			text
				c7a: '#9ea1a7', // dark: 			sub-text
				c8: '#171a20', // light:			text
				c8a: '#7d8483', // light:			sub-text

				c9: '#26aee4', // dark/light: 		active, links, logo
				c10: '#78b752', // dark/light: 		success
				c11: '#ffca03', // dark/light: 		warning
				c11o: '#ffca0326', // dark/light: 	warning light
				c12: '#f95d51', // dark/light: 		error
				c12o: '#f95d5126' // dark/light: 	error light
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
			loader: {
				linear: {
					width: 250
				}
			},
			snackbar: {
				timeout: 6000,
				direction: {
					vertical: 'bottom',
					horizontal: 'left'
				}
			},
			drawer: {
				width: 260
			},
			table: {
				minusContentHeight: 248
			},
			authentication: {
				validateBefore: 2 * 60 * 1000 // 2 minutes
			},
			robots: {
				pageSizes: [5, 10, 15, 20, 50]
			}
		};
	}

	/**
	 * routes
	 */
	get AppRoutes() {
		return appRoutes;
	}

	/**
	 * services
	 */
	get AppServices() {
		return {
			COMMON: {
				LOGS: `${this.envApiUrl}/frontend-logs`,
				CHANGE_LOG
			},
			AUTH: {
				SIGN_IN: `${this.envApiUrl}/auth/${this.envRealm}/login`,
				AUTO_REFRESH: `${this.envApiUrl}/auth/${this.envRealm}/refresh`
			},
			SITES: {
				LIST: `${this.envApiUrl}/sites`
			},
			ROBOT_TWINS: {
				LIST: `${this.envApiUrl}/robot-twins`
			},
			ROBOTS: {
				LIST: `${this.envApiUrl}/robots`
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
