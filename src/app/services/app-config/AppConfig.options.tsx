import { AppConfigService } from '..';

/**
 * app options
 * @param config
 * @returns
 */
const AppOptions = (config: typeof AppConfigService) => {
	return {
		common: {
			alertDocsUrl: config.envAlertDocsUrl,
			currencies: [
				{ id: 'EUR', name: 'EUR' },
				{ id: 'CHF', name: 'CHF' }
			],
			timezones: [{ id: 'Europe/Berlin', name: 'Europe/Berlin' }],
			none: '---',
			dots: '...'
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
				closeWidth: 56,
				iconMinWidth: 50
			},
			table: {
				contentHeight1: 48 + 70.5 + 24 + 52 - 8,
				contentHeight2: 48 + 70.5 + 24 + 52 - 8 + 72,
				contentHeight3: 48 + 70.5 + 24 + 52 - 8 + 42,
				contentHeight4: 48 + 70.5 + 24 + 52 - 8 + 72 + 42
			},
			uploadImage: {
				maxSize: 500,
				maxHeight: 220,
				maxWidth: 220
			},
			readMore: {
				min: 150
			}
		},
		screens: {
			authentication: {
				refreshTime: 5000,
				validateBeforeExpiry: 2 * 60 * 1000 // 2 minutes before expiry
			},
			business: {
				general: {
					emails: {
						list: {
							refreshTime: 10000,
							showPageSizes: true,
							defaultPageSize: 50,
							pageSizes: [5, 10, 15, 20, 50, 100]
						}
					}
				},
				sites: {
					list: {
						refreshTime: 20000,
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
								refreshTime: 20000,
								showPageSizes: false,
								defaultPageSize: 50,
								pageSizes: [5, 10, 15, 20, 50, 100]
							}
						},
						phoneConfigs: {
							list: {
								refreshTime: 10000,
								showPageSizes: true,
								defaultPageSize: 50,
								pageSizes: [5, 10, 15, 20, 50, 100]
							}
						},
						phoneCalls: {
							list: {
								refreshTime: 10000,
								showPageSizes: true,
								defaultPageSize: 50,
								pageSizes: [5, 10, 15, 20, 50, 100]
							}
						},
						statistics: {
							wifiHeatmap: {
								refreshTime: 20000
							}
						},
						configuration: {
							notifications: {
								refreshTime: 20000
							},
							servicePositions: {
								refreshTime: 20000
							}
						}
					}
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
							refreshTime: 2000,
							alert: {
								messageSizes: [45, 70]
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
							list: {
								refreshTime: 10000,
								showPageSizes: true,
								defaultPageSize: 50,
								pageSizes: [5, 10, 15, 20, 50, 100]
							}
						},
						commandsLog: {
							list: {
								refreshTime: 10000,
								showPageSizes: true,
								defaultPageSize: 50,
								pageSizes: [5, 10, 15, 20, 50, 100]
							}
						},
						elevatorCalls: {
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
			settings: {
				deepLinks: {
					list: {
						refreshTime: 25000,
						showPageSizes: true,
						defaultPageSize: 50,
						pageSizes: [5, 10, 15, 20, 50, 100]
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
			email: new RegExp(/\S+@\S+\.\S+/),
			maxTwoDecimalPoints: new RegExp(/^\d+(\.\d{1,2})?$/),
			integer: new RegExp(/^\+?([1-9]\d*)$/),
			skipLastSlashes: new RegExp(/\/+$/),
			rooms: new RegExp(/\b[0-9]+([-,]+[0-9]*)?\b$/)
		}
	};
};
export default AppOptions;
