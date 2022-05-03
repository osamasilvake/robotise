import { ThemeOptions } from '@mui/material';

import { AppConfigService } from '../services';
import { pxToRem } from '../utilities/methods/Number';

/**
 * Light mode
 * @param options
 */
const Light = (options: ThemeOptions): ThemeOptions => ({
	...options,
	palette: {
		...options.palette,
		mode: 'light',
		background: {
			default: AppConfigService.AppOptions.colors.c4, // body
			paper: AppConfigService.AppOptions.colors.c5
		},
		text: {
			primary: AppConfigService.AppOptions.colors.c8,
			secondary: AppConfigService.AppOptions.colors.c8a
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
					backgroundColor: AppConfigService.AppOptions.colors.c4
				},
				elevation11: {
					boxShadow: 'none',
					padding: `${pxToRem(15)} ${pxToRem(20)}`,
					transition: 'none'
				},
				elevation12: {
					backgroundColor: AppConfigService.AppOptions.colors.c4,
					boxShadow: 'none',
					padding: pxToRem(20),
					transition: 'none'
				},
				elevation13: {
					backgroundColor: AppConfigService.AppOptions.colors.c4,
					boxShadow: 'none',
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
					backgroundColor: AppConfigService.AppOptions.colors.c5
				},
				stickyHeader: {
					backgroundColor: AppConfigService.AppOptions.colors.c5
				}
			}
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					'&.MuiTableRow-hover:hover': {
						backgroundColor: AppConfigService.AppOptions.colors.c5,
						cursor: 'pointer'
					}
				}
			}
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					backgroundColor: AppConfigService.AppOptions.colors.c5
				}
			}
		},
		MuiTabs: {
			styleOverrides: {
				...options.components?.MuiTabs?.styleOverrides,
				root: {
					backgroundColor: AppConfigService.AppOptions.colors.c5
				}
			}
		},
		MuiTab: {
			styleOverrides: {
				textColorPrimary: {
					minWidth: pxToRem(135),
					'&.Mui-selected': {
						backgroundColor: AppConfigService.AppOptions.colors.c4,
						borderTop: `${pxToRem(1)} solid ${AppConfigService.AppOptions.colors.c9}`
					}
				}
			}
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: AppConfigService.AppOptions.colors.c8a
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				input: {
					filter: 'none',
					'&:-webkit-autofill': {
						WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
							AppConfigService.AppOptions.colors.c4
						} inset`
					},
					'&::-webkit-calendar-picker-indicator': {
						filter: 'invert(0.35)'
					}
				}
			}
		}
	}
});
export default Light;
