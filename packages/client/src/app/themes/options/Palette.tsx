import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { AppConfigService } from '../../services';

const PaletteCustom: PaletteOptions = {
	primary: {
		main: AppConfigService.AppVariables.colors.c4
	},
	secondary: {
		main: AppConfigService.AppVariables.colors.c1
	}
};
export default PaletteCustom;
