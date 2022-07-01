import { PaletteOptions } from '@mui/material/styles/createPalette';

import { AppConfigService } from '../../services';

const PaletteCustom: PaletteOptions = {
	primary: {
		main: AppConfigService.AppOptions.colors.c9
	},
	secondary: {
		main: AppConfigService.AppOptions.colors.c10v1
	},
	info: {
		main: AppConfigService.AppOptions.colors.c7
	},
	success: {
		main: AppConfigService.AppOptions.colors.c10v1
	},
	warning: {
		main: AppConfigService.AppOptions.colors.c11
	},
	error: {
		main: AppConfigService.AppOptions.colors.c12
	}
};
export default PaletteCustom;
