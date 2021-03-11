import { ThemeOptions } from '@material-ui/core';

import { AppConfigService } from '../services';
import { pxToRem } from '../utilities/methods/PixelsToRem';

// block shadow
const blockShadow = `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
	AppConfigService.AppVariables.colors.c3
}`;

/**
 * Dark mode
 * @param common
 */
const Dark = (common: ThemeOptions): ThemeOptions => {
	return {
		...common,
		palette: {
			...common.palette,
			type: 'dark',
			background: {
				default: AppConfigService.AppVariables.colors.c1 // body
			},
			text: {
				primary: AppConfigService.AppVariables.colors.c7,
				secondary: AppConfigService.AppVariables.colors.c7a
			}
		},
		overrides: {
			...common.overrides,
			MuiPaper: {
				root: {
					backgroundColor: AppConfigService.AppVariables.colors.c2
				},
				elevation11: {
					borderBottom: `1px solid ${AppConfigService.AppVariables.colors.c2a}`,
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
					backgroundColor: AppConfigService.AppVariables.colors.c2,
					boxShadow: blockShadow
				}
			},
			MuiDrawer: {
				...common.overrides?.MuiDrawer,
				paper: {
					background: AppConfigService.AppVariables.colors.c2,
					boxShadow: blockShadow
				}
			},
			MuiIconButton: {
				...common.overrides?.MuiIconButton,
				root: {
					...common.overrides?.MuiIconButton?.root,
					color: AppConfigService.AppVariables.colors.c7
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
