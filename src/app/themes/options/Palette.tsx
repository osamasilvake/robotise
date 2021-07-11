import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { AppConfigService } from '../../services';

const PaletteCustom: PaletteOptions = {
	primary: {
		main: AppConfigService.AppOptions.colors.c9
	},
	secondary: {
		main: AppConfigService.AppOptions.colors.c10v1
	},
	error: {
		main: AppConfigService.AppOptions.colors.c12
	}
};
export default PaletteCustom;
