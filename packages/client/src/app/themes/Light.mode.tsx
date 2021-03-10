import { ThemeOptions } from '@material-ui/core';

import { AppConfigService } from '../services';
import { pxToRem } from '../utilities/methods/PixelsToRem';

// block shadow
const blockShadow = `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
	AppConfigService.AppVariables.colors.c6
}`;

/**
 * Light mode
 * @param common
 */
const Light = (common: ThemeOptions): ThemeOptions => {
	console.log(common);
	return {
		...common,
		palette: {
			...common.palette,
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
			...common.overrides,
			MuiPaper: {
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c5
				},
				elevation11: {
					backgroundColor: AppConfigService.AppVariables.colors.c5a,
					boxShadow: blockShadow,
					padding: pxToRem(15),
					transition: 'none'
				},
				elevation12: {
					boxShadow: blockShadow,
					padding: pxToRem(15),
					transition: 'none'
				}
			},
			MuiAppBar: {
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c5,
					boxShadow: blockShadow
				}
			},
			MuiDrawer: {
				...common.overrides?.MuiDrawer,
				paper: {
					background: AppConfigService.AppVariables.colors.c5,
					boxShadow: blockShadow
				}
			},
			MuiIconButton: {
				...common.overrides?.MuiIconButton,
				root: {
					...common.overrides?.MuiIconButton?.root,
					color: AppConfigService.AppVariables.colors.c8
				}
			},
			MuiOutlinedInput: {
				input: {
					'&:-webkit-autofill': {
						WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
							AppConfigService.AppVariables.colors.c5
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
