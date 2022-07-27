import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../../services';

export const SitePerformanceDemographyTopProductsTableStyle = makeStyles((theme: Theme) => ({
	sImage: {
		height: theme.spacing(3.5),
		width: theme.spacing(3.5)
	},
	sImageBackground: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c15, 0.7)
	}
}));
