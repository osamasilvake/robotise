import { ThemeOptions } from '@material-ui/core';

import { AppConfigService } from '../services';
import { pxToRem } from '../utilities/methods/PixelsToRem';

/**
 * Light mode
 * @param options
 */
const Light = (options: ThemeOptions): ThemeOptions => {
	return {
		...options,
		palette: {
			...options.palette,
			type: 'light',
			background: {
				default: AppConfigService.AppVariables.colors.c4 // body
			},
			text: {
				primary: AppConfigService.AppVariables.colors.c8,
				secondary: AppConfigService.AppVariables.colors.c8a
			}
		},
		overrides: {
			...options.overrides,
			MuiPaper: {
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c4
				},
				elevation11: {
					boxShadow: 'none',
					padding: `${pxToRem(15)} ${pxToRem(20)}`,
					transition: 'none'
				},
				elevation12: {
					boxShadow: 'none',
					padding: pxToRem(20),
					transition: 'none'
				}
			},
			MuiAppBar: {
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c5,
					boxShadow: 'none'
				}
			},
			MuiDrawer: {
				...options.overrides?.MuiDrawer,
				paper: {
					background: AppConfigService.AppVariables.colors.c5,
					boxShadow: 'none'
				}
			},
			MuiTableCell: {
				root: {
					borderBottom: 'none'
				},
				stickyHeader: {
					backgroundColor: AppConfigService.AppVariables.colors.c5
				}
			},
			MuiTableRow: {
				root: {
					'&.MuiTableRow-hover:hover': {
						backgroundColor: AppConfigService.AppVariables.colors.c5,
						cursor: 'pointer'
					}
				}
			},
			MuiTablePagination: {
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c5
				}
			},
			MuiTabs: {
				...options.overrides?.MuiTabs,
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c5
				}
			},
			MuiTab: {
				textColorPrimary: {
					'&$selected': {
						backgroundColor: AppConfigService.AppVariables.colors.c4,
						borderTop: `${pxToRem(1)} solid ${AppConfigService.AppVariables.colors.c9}`,
						color: AppConfigService.AppVariables.colors.c9
					}
				}
			},
			MuiCardContent: {
				...options.overrides?.MuiCardContent,
				root: {
					...options.overrides?.MuiCardContent?.root,
					backgroundColor: AppConfigService.AppVariables.colors.c5
				}
			},
			MuiIconButton: {
				...options.overrides?.MuiIconButton,
				root: {
					...options.overrides?.MuiIconButton?.root,
					color: AppConfigService.AppVariables.colors.c8
				}
			},
			MuiTooltip: {
				tooltip: {
					backgroundColor: AppConfigService.AppVariables.colors.c2,
					color: AppConfigService.AppVariables.colors.c7
				}
			},
			MuiOutlinedInput: {
				input: {
					'&:-webkit-autofill': {
						WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
							AppConfigService.AppVariables.colors.c4
						} inset`,
						'&::first-line': {
							fontSize: pxToRem(16),
							fontFamily: AppConfigService.AppOptions.styles.fontFamily.Roboto
						}
					}
				}
			}
		}
	};
};
export default Light;
