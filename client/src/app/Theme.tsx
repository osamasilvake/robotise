import { ThemeOptions } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';

import { ConfigService } from './services';
import { pxToRem } from './utilities/methods/PixelsToRem';

/**
 * theme settings
 * @param prefersDarkMode
 */
export const ThemeSettings = (prefersDarkMode: boolean): ThemeOptions =>
	prefersDarkMode ? Dark : Light;

// common palette
const palette: PaletteOptions = {
	primary: {
		main: ConfigService.AppVariables.colors.c4
	},
	secondary: {
		main: ConfigService.AppVariables.colors.c1
	}
};

// common overrides
const overrides: Overrides = {
	MuiAvatar: {
		img: {
			objectFit: 'contain'
		}
	},
	MuiButton: {
		root: {
			height: pxToRem(44)
		},
		containedPrimary: {
			color: 'white'
		}
	}
};

// theme: light
const Light: ThemeOptions = {
	palette: {
		...palette,
		type: 'light',
		background: {
			default: ConfigService.AppVariables.colors.c2
		}
	},
	overrides: {
		...overrides,
		MuiAppBar: {
			colorPrimary: {
				backgroundColor: ConfigService.AppVariables.colors.c2,
				color: ConfigService.AppVariables.colors.c3
			}
		},
		MuiDrawer: {
			paper: {
				background: ConfigService.AppVariables.colors.c2,
				color: ConfigService.AppVariables.colors.c3
			}
		}
	}
};

// theme: dark
const Dark: ThemeOptions = {
	palette: {
		...palette,
		type: 'dark',
		background: {
			default: ConfigService.AppVariables.colors.c3
		}
	},
	overrides: {
		...overrides,
		MuiAppBar: {
			colorPrimary: {
				backgroundColor: ConfigService.AppVariables.colors.c3,
				color: ConfigService.AppVariables.colors.c2
			}
		},
		MuiDrawer: {
			paper: {
				background: ConfigService.AppVariables.colors.c3,
				color: ConfigService.AppVariables.colors.c2
			}
		}
	}
};
