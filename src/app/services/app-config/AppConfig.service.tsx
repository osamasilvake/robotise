import appRoutes from '../../routes/app-routes';
import EnvService from '../env/Env.service';
import CHANGE_LOG from './../../../../CHANGELOG.md';

class AppConfigService extends EnvService {
	/**
	 * options
	 */
	get AppOptions() {
		return {
			colors: {
				c1: '#313131', // dark: 			body/content
				c2: '#383a3c', // dark:				paper
				c3: '#2e2e31', // dark: 			box-shadow

				c4: '#ffffff', // light: 			body/content
				c5: '#eeeeee ', // light: 			paper
				c6: '#dbdcde', // light: 			box-shadow

				c7: '#ffffff', // dark: 			text
				c7a: '#9ea1a7', // dark: 			sub-text
				c8: '#171a20', // light:			text
				c8a: '#818386', // light:			sub-text

				c9: '#26aee4', // dark/light: 		blue
				c10: '#3c963f', // dark/light: 		green
				c11: '#e8ba0e', // dark/light: 		yellow
				c12: '#e4291c', // dark/light: 		red
				c13: '#818386', // dark/light:		grey
				c14: '#d4892d', // dark/light:		orange
				c15: '#9d48de' // dark/light:		purple
			},
			styles: {
				fontFamily: {
					Roboto: 'Roboto'
				},
				zIndex: {
					level2: 2
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
					contentHeight1: 64 + 40 + 69.8 + 28 + 52 - 8,
					contentHeight2: 64 + 40 + 69.8 + 28 + 52 + 72 - 8
				}
			},
			screens: {
				authentication: {
					validateBeforeExpiry: 2 * 60 * 1000 // 2 minutes before expiry
				},
				robots: {
					list: {
						refreshTime: 20000,
						showPageSizes: false,
						defaultPageSize: 100,
						pageSizes: [5, 10, 15, 20, 50, 100]
					},
					content: {
						detail: {
							refreshTime: 30000,
							alert: {
								messageSizes: [50, 70]
							},
							camera: {
								requestDelay: 8000
							}
						},
						inventory: {
							refreshTime: 30000
						},
						orders: {
							list: {
								refreshTime: 20000,
								showPageSizes: true,
								defaultPageSize: 20,
								pageSizes: [5, 10, 15, 20, 50, 100]
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
			SITE: {
				ALL: `${this.envApiUrl}/sites`,
				PRODUCTS: `${this.envApiUrl}/products`
			},
			ROBOT: {
				ALL: `${this.envApiUrl}/robots`,
				MAPS: `${this.envApiUrl}/maps/:mapId`,
				COMMANDS: `${this.envApiUrl}/robots/:robot/commands`,
				INVENTORY: `${this.envApiUrl}/robots/:robot/inventory`,
				ORDERS: `${this.envApiUrl}/orders`
			},
			ROBOT_TWINS: {
				SUMMARY: `${this.envApiUrl}/robot-twins-summary`,
				ALL: `${this.envApiUrl}/robot-twins`,
				SINGLE: `${this.envApiUrl}/robot-twins/:robotTwinId`
			}
		};
	}

	/**
	 * local/session storage
	 */
	get StorageItems() {
		return {
			JWTAccessToken: 'robotise_access_token',
			ThemePalette: 'robotise_theme_palette',
			ChangeLanguage: 'robotise_change_language',
			DrawerState: 'robotise_drawer_state'
		};
	}

	/**
	 * links
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
	 * headers
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
