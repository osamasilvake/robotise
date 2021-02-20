import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { AppVariables } from '../app.config';

const Light: PaletteOptions = {
	type: 'light',
	background: {
		default: AppVariables.colors.c2
	},
	primary: {
		main: '#ddd'
	}
};

const Dark: PaletteOptions = {
	type: 'dark',
	background: {
		default: AppVariables.colors.c3
	},
	primary: {
		main: '#ddd'
	}
};

export { Dark, Light };
