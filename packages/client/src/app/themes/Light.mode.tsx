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
					borderBottom: `1px solid ${AppConfigService.AppVariables.colors.c5}`,
					boxShadow: 'none',
					padding: `${pxToRem(15)} ${pxToRem(20)}`,
					transition: 'none'
				},
				elevation12: {
					boxShadow: 'none',
					padding: `${pxToRem(20)} ${pxToRem(20)}`,
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
			MuiIconButton: {
				...options.overrides?.MuiIconButton,
				root: {
					...options.overrides?.MuiIconButton?.root,
					color: AppConfigService.AppVariables.colors.c8
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
							fontFamily: AppConfigService.AppOptions.fontFamily.Roboto
						}
					}
				}
			}
		}
	};
};
export default Light;
