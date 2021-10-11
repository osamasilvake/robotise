import { ThemeOptions } from '@mui/material';

import { AppConfigService } from '../services';
import { pxToRem } from '../utilities/methods/Number';

/**
 * Dark mode
 * @param options
 */
const Dark = (options: ThemeOptions): ThemeOptions => ({
	...options,
	palette: {
		...options.palette,
		mode: 'dark',
		background: {
			default: AppConfigService.AppOptions.colors.c1, // body
			paper: AppConfigService.AppOptions.colors.c2
		},
		text: {
			primary: AppConfigService.AppOptions.colors.c7,
			secondary: AppConfigService.AppOptions.colors.c7a
		}
	},
	components: {
		...options.components,
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: 'unset'
				},
				elevation2: {
					backgroundColor: AppConfigService.AppOptions.colors.c1
				},
				elevation11: {
					boxShadow: 'none',
					padding: `${pxToRem(15)} ${pxToRem(20)}`,
					transition: 'none'
				},
				elevation12: {
					backgroundColor: AppConfigService.AppOptions.colors.c1,
					boxShadow: 'none',
					padding: pxToRem(20),
					transition: 'none'
				}
			}
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderBottom: 'none'
				},
				head: {
					backgroundColor: AppConfigService.AppOptions.colors.c2
				},
				stickyHeader: {
					backgroundColor: AppConfigService.AppOptions.colors.c2
				}
			}
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					'&.MuiTableRow-hover:hover': {
						backgroundColor: AppConfigService.AppOptions.colors.c2,
						cursor: 'pointer'
					}
				}
			}
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					backgroundColor: AppConfigService.AppOptions.colors.c2
				}
			}
		},
		MuiTabs: {
			styleOverrides: {
				...options.components?.MuiTabs?.styleOverrides,
				root: {
					backgroundColor: AppConfigService.AppOptions.colors.c2
				}
			}
		},
		MuiTab: {
			styleOverrides: {
				textColorPrimary: {
					minWidth: pxToRem(135),
					'&.Mui-selected': {
						backgroundColor: AppConfigService.AppOptions.colors.c1,
						borderTop: `${pxToRem(1)} solid ${AppConfigService.AppOptions.colors.c9}`
					}
				}
			}
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: AppConfigService.AppOptions.colors.c7a
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				input: {
					filter: 'none',
					'&:-webkit-autofill': {
						WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
							AppConfigService.AppOptions.colors.c1
						} inset`,
						'&::first-line': {
							fontSize: pxToRem(16),
							fontFamily: AppConfigService.AppOptions.styles.fontFamily.Roboto
						}
					},
					'&::-webkit-calendar-picker-indicator': {
						filter: 'invert(0.55)'
					}
				}
			}
		}
	}
});
export default Dark;
