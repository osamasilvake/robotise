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
				c8a: '#7c8483', // light:			sub-text

				c9: '#26aee4', // dark/light: 		blue
				c10: '#78b752', // dark/light: 		green
				c11: '#e8ba0e', // dark/light: 		yellow
				c12: '#e4291c', // dark/light: 		red
				c13: '#818386' // dark/light:		grey
			}
		};
	}

	/**
	 * general
	 */
	get AppOptions() {
		return {
			styles: {
				fontFamily: {
					Roboto: 'Roboto'
				},
				responsive: {
					mobile: 600 - 1
				}
			},
			components: {
				loader: {
					linear: {
						width: 250
					}
				},
				snackbar: {
					timeout: {
						fast: 2000,
						slow: 5000
					},
					direction: {
						vertical: 'bottom',
						horizontal: 'left'
					}
				},
				drawer: {
					width: 260
				},
				table: {
					minusContentHeight: 64 + 40 + 69.8 + 28 + 52 - 8
				}
			},
			screens: {
				authentication: {
					validateBeforeExpiry: 2 * 60 * 1000 // 2 minutes before expiry
				},
				robots: {
					list: {
						robotTwinsRefreshInMs: 20000,
						showPageSizes: false,
						defaultPageSize: 100,
						pageSizes: [5, 10, 15, 20, 50, 100, 150]
					},
					content: {
						detail: {
							alert: {
								messageSizes: [50, 70]
							}
						}
					}
				}
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
			ROBOT: {
				ALL: `${this.envApiUrl}/robots`,
				MAP: `${this.envApiUrl}/maps`
			},
			ROBOT_TWINS: {
				SUMMARY: `${this.envApiUrl}/robot-twins-summary`,
				ALL: `${this.envApiUrl}/robot-twins`
			}
		};
	}

	/**
	 * local/session storage
	 */
	get StorageItems() {
		return {
			JWTAccessToken: 'robotise_jwt_access_token',
			ThemePalette: 'robotise_theme_palette',
			ChangeLanguage: 'robotise_change_language',
			DrawerState: 'robotise_drawer_state'
		};
	}

	/**
	 * images URLs
	 */
	get AppImageURLs() {
		return {
			logo: {
				icon: '/assets/svg/logos/robotise-icon.svg',
				iconOff: '/assets/svg/logos/robotise-icon-off.svg',
				name: '/assets/svg/logos/robotise-name.svg'
			},
			robotise: {
				format: '.jpg',
				path: '/assets/images/robotise/'
			},
			avatar: {
				name: 'avatar',
				path: '/assets/svg/avatars/avatar.svg'
			},
			qrCode: {
				name: 'qr code',
				path: {
					dark: '/assets/svg/qr-code/qr-dark.svg',
					light: '/assets/svg/qr-code/qr-light.svg'
				}
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
