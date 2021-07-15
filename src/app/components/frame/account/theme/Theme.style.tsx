import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../../services';

export const ThemePaletteStyle = makeStyles(() => ({
	sColorThemeLight: {
		fill: AppConfigService.AppOptions.colors.c14
	}
}));
