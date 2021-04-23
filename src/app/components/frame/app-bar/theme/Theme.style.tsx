import { makeStyles } from '@material-ui/core';

import { AppConfigService } from '../../../../services';

export const ThemePaletteStyles = makeStyles(() => ({
	sColorThemeLight: {
		fill: AppConfigService.AppOptions.colors.c11
	}
}));
