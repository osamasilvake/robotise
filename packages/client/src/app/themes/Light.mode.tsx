import { ThemeOptions } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';

import { AppConfigService } from '../services';
import { pxToRem } from '../utilities/methods/PixelsToRem';

// block shadow
const blockShadow = `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
	AppConfigService.AppVariables.colors.c6
}`;

/**
 * Light mode
 * @param common
 * @param palette
 * @param overrides
 */
const Light = (
	common: ThemeOptions,
	palette: PaletteOptions,
	overrides: Overrides
): ThemeOptions => {
	return {
		...common,
		palette: {
			...palette,
			type: 'light',
			background: {
				default: AppConfigService.AppVariables.colors.c4
			}
		},
		overrides: {
			...overrides,
			MuiPaper: {
				...overrides.MuiPaper,
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c5
				},
				elevation1: {
					boxShadow: blockShadow,
					padding: pxToRem(2),
					transition: 'none'
				}
			},
			MuiAppBar: {
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c5,
					boxShadow: blockShadow,
					color: AppConfigService.AppVariables.colors.c7
				}
			},
			MuiDrawer: {
				...overrides.MuiDrawer,
				paper: {
					background: AppConfigService.AppVariables.colors.c5,
					boxShadow: blockShadow,
					color: AppConfigService.AppVariables.colors.c7
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
