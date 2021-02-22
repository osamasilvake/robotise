import { ThemeOptions } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { AppConfig } from './services';
import { pxToRem } from './utilities/methods/PixelsToRem';

export const ThemeSettings = (prefersDarkMode: boolean): ThemeOptions => ({
	palette: prefersDarkMode ? Dark : Light,
	overrides: {
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
	}
});

const Light: PaletteOptions = {
	type: 'light',
	background: {
		default: AppConfig.AppVariables.colors.c2
	},
	primary: {
		main: '#60aadc'
	},
	secondary: {
		main: '#11cb5f'
	}
};

const Dark: PaletteOptions = {
	type: 'dark',
	background: {
		default: AppConfig.AppVariables.colors.c3
	},
	primary: {
		main: '#60aadc'
	},
	secondary: {
		main: '#11cb5f'
	}
};
