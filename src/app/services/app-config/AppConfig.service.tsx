import appRoutes from '../../routes/app-routes';
import EnvService from '../env/Env.service';
import CHANGE_LOG from './../../../../CHANGELOG.md';

class AppConfigService extends EnvService {
	/**
	 * options
	 */
	get AppOptions() {
		return {
			common: {
				defaultCurrency: 'EUR'
			},
			colors: {
				c1: '#313131', // dark: 			body/content
				c2: '#383a3c', // dark:				paper
				c3: '#2e2e31', // dark: 			box-shadow

				c4: '#ffffff', // light: 			body/content
				c5: '#eeeeee ', // light: 			paper
				c6: '#dbdcde', // light: 			box-shadow

				c7: '#ffffff', // dark: 			text-dark
				c7a: '#9ea1a7', // dark: 			text-light
				c8: '#171a20', // light:			text-dark
				c8a: '#717375', // light:			text-light

				c9: '#26aee4', // 					blue
				c10: '#2e7d32', //					green
				c10v1: '#4caf50', // 				green LIGHT
				c11: '#ffe200', // 			 		yellow
				c12: '#ff3729', //			 		red
				c13: '#717375', // 					grey
				c14: '#ff9d24' //					orange
			},
			styles: {
				fontFamily: {
					Roboto: 'Roboto'
				},
				zIndex: {
					level2: 2,
					level3: 3
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
					width: 250
				},
				table: {
					contentHeight1: 48 + 70.5 + 24 + 52 - 8,
					contentHeight2: 48 + 70.5 + 24 + 52 - 8 + 72
				},
				uploadImage: {
					maxSize: 500,
					maxHeight: 220,
					maxWidth: 220
				}
			},
			screens: {
				authentication: {
					validateBeforeExpiry: 2 * 60 * 1000 // 2 minutes before expiry
				},
				sites: {
					list: {
						refreshTime: 10000,
						showPageSizes: false,
						defaultPageSize: 100,
						pageSizes: [5, 10, 15, 20, 50, 100]
					},
					content: {
						detail: {
							refreshTime: 10000
						},
						products: {
							list: {
								refreshTime: 10000,
								showPageSizes: false,
								defaultPageSize: 50,
								pageSizes: [5, 10, 15, 20, 50, 100]
							}
						}
					}
				},
				robots: {
					list: {
						refreshTime: 10000,
						showPageSizes: false,
						defaultPageSize: 100,
						pageSizes: [5, 10, 15, 20, 50, 100]
					},
					content: {
						detail: {
							refreshTime: 2000,
							alert: {
								messageSizes: [50, 70]
							},
							commands: {
								requestDelay: 4000
							},
							camera: {
								requestDelay: 8000
							}
						},
						inventory: {
							refreshTime: 10000
						},
						orders: {
							list: {
								refreshTime: 10000,
								showPageSizes: true,
								defaultPageSize: 50,
								pageSizes: [5, 10, 15, 20, 50, 100]
							},
							content: {
								refreshTime: 10000
							}
						},
						purchases: {
							list: {
								refreshTime: 10000,
								showPageSizes: true,
								defaultPageSize: 50,
								pageSizes: [5, 10, 15, 20, 50, 100]
							},
							content: {
								refreshTime: 10000
							}
						}
					}
				}
			},
			regex: {
				onlyNumbers: new RegExp(/^\d+$/),
				maxTwoDecimalPoints: new RegExp(/^\d+(\.\d{1,2})?$/)
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
				LOGS: `${this.envAppUrl}/frontend-logs`,
				CHANGE_LOG
			},
			AUTH: {
				SIGN_IN: `${this.envAppUrl}/auth/${this.envRealm}/login`,
				AUTO_REFRESH: `${this.envAppUrl}/auth/${this.envRealm}/refresh`
			},
			SITE: {
				ALL: `${this.envAppUrl}/sites`,
				SINGLE: `${this.envAppUrl}/sites/:siteId`,
				SERVICE_POSITIONS: `${this.envAppUrl}/service-positions`,
				PRODUCTS: `${this.envAppUrl}/products`
			},
			ROBOT: {
				MAPS: `${this.envAppUrl}/maps/:mapId`,
				COMMANDS: `${this.envAppUrl}/robots/:robot/commands`,
				INVENTORY: `${this.envAppUrl}/robots/:robot/inventory`,
				ORDERS: `${this.envAppUrl}/orders`,
				ORDER: `${this.envAppUrl}/orders/:order`,
				PURCHASES: `${this.envAppUrl}/order-reports`,
				PURCHASE: `${this.envAppUrl}/order-reports/:purchase`,
				SYNC_PRODUCTS: `${this.envAppUrl}/robots/:robot/sync-products`
			},
			ROBOT_TWINS: {
				SUMMARY: `${this.envAppUrl}/robot-twins-summary`,
				ALL: `${this.envAppUrl}/robot-twins`,
				SINGLE: `${this.envAppUrl}/robot-twins/:robotTwinId`
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
			DrawerState: 'robotise_drawer_state',
			IntendedURL: 'robotise_intended_url'
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
