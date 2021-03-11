import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { AppConfigService } from '../../services';

const PaletteCustom: PaletteOptions = {
	primary: {
		main: AppConfigService.AppVariables.colors.c9
	}
};
export default PaletteCustom;
