import { ThemeOptions } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';

import { AppConfigService } from '../services';
import { pxToRem } from '../utilities/methods/PixelsToRem';

// block shadow
const blockShadow = `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
	AppConfigService.AppVariables.colors.c3
}`;

/**
 * Dark mode
 * @param common
 * @param palette
 * @param overrides
 */
const Dark = (
	common: ThemeOptions,
	palette: PaletteOptions,
	overrides: Overrides
): ThemeOptions => {
	return {
		...common,
		palette: {
			...palette,
			type: 'dark',
			background: {
				default: AppConfigService.AppVariables.colors.c1
			}
		},
		overrides: {
			...overrides,
			MuiPaper: {
				...overrides.MuiPaper,
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c2
				},
				elevation1: {
					boxShadow: blockShadow,
					padding: pxToRem(2),
					transition: 'none'
				}
			},
			MuiAppBar: {
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c2,
					boxShadow: blockShadow,
					color: AppConfigService.AppVariables.colors.c4
				}
			},
			MuiDrawer: {
				...overrides.MuiDrawer,
				paper: {
					background: AppConfigService.AppVariables.colors.c2,
					boxShadow: blockShadow,
					color: AppConfigService.AppVariables.colors.c4
				}
			},
			MuiOutlinedInput: {
				input: {
					'&:-webkit-autofill': {
						WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
							AppConfigService.AppVariables.colors.c2
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
export default Dark;
