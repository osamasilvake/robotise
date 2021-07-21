import appRoutes from '../../routes/app-routes';
import EnvService from '../env/Env.service';

class AppConfigService extends EnvService {
	/**
	 * options
	 */
	get AppOptions() {
		return {
			common: {
				defaultCurrency: 'EUR',
				none: '---'
			},
			colors: {
				c1: '#212629', // dark: 			content
				c2: '#272c2f', // dark:				sidebar
				c3: '#2e2e31', // dark: 			shadow

				c4: '#ffffff', // light: 			content
				c5: '#eeeeee ', // light: 			sidebar
				c6: '#dbdcde', // light: 			shadow

				c7: '#ffffff', //					text-dark
				c7a: '#9ea1a7', //					text-light
				c8: '#171a20', //					text-dark
				c8a: '#717375', //					text-light

				c9: '#26aee4', // 					blue
				c10: '#2e7d32', //					green
				c10v1: '#4caf50', // 				green LIGHT
				c11: '#ffe200', // 			 		yellow
				c12: '#ff3729', //			 		red
				c13: '#717375', // 					grey
				c14: '#ff9d24', //					orange
				c15: '#383a3c' //					black
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
					openWidth: 250,
					closeWidth: 56
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
				business: {
					sites: {
						list: {
							refreshTime: 25000,
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
							},
							configuration: {
								notifications: {
									refreshTime: 10000
								}
							}
						}
					},
					robots: {
						list: {
							refreshTime: 25000,
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
								detail: {
									refreshTime: 10000
								},
								list: {
									refreshTime: 10000,
									showPageSizes: true,
									defaultPageSize: 50,
									pageSizes: [5, 10, 15, 20, 50, 100]
								}
							},
							purchases: {
								detail: {
									refreshTime: 10000
								},
								list: {
									refreshTime: 10000,
									showPageSizes: true,
									defaultPageSize: 50,
									pageSizes: [5, 10, 15, 20, 50, 100]
								}
							}
						}
					}
				},
				information: {
					alertCodes: {
						list: {
							refreshTime: 25000,
							showPageSizes: true,
							defaultPageSize: 50,
							pageSizes: [5, 10, 15, 20, 50, 100]
						}
					}
				}
			},
			regex: {
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
				LOGS: `${this.envAppUrl}/frontend-logs`
			},
			AUTH: {
				SIGN_IN: `${this.envAppUrl}/auth/${this.envRealm}/login`,
				AUTO_REFRESH: `${this.envAppUrl}/auth/${this.envRealm}/refresh`
			},
			SCREENS: {
				BUSINESS: {
					SITES: {
						ALL: `${this.envAppUrl}/sites`,
						SINGLE: `${this.envAppUrl}/sites/:siteId`,
						PRODUCTS: `${this.envAppUrl}/products`,
						SERVICE_POSITIONS: `${this.envAppUrl}/service-positions`,
						NOTIFICATION: {
							TYPES: `${this.envAppUrl}/notification-types`,
							USERS: `${this.envAppUrl}/notification-users`,
							USER: `${this.envAppUrl}/notification-users/:userId`
						}
					},
					ROBOTS: {
						ALL: `${this.envAppUrl}/robot-twins-summary`,
						SINGLE: `${this.envAppUrl}/robot-twins/:robotTwinId`,
						INVENTORY: `${this.envAppUrl}/robots/:robot/inventory`,
						ORDERS: `${this.envAppUrl}/orders`,
						ORDER: `${this.envAppUrl}/orders/:order`,
						PURCHASES: `${this.envAppUrl}/order-reports`,
						PURCHASE: `${this.envAppUrl}/order-reports/:purchase`,
						MAPS: `${this.envAppUrl}/maps/:mapId`,
						COMMANDS: `${this.envAppUrl}/robots/:robot/commands`,
						SYNC_PRODUCTS: `${this.envAppUrl}/robots/:robot/sync-products`
					}
				},
				INFORMATION: {
					ALERT_CODES: `${this.envAppUrl}/active-alert-codes`
				}
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
