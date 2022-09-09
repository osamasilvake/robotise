import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../../services';

export const SitePerformanceDemographyTopProductsTableStyle = makeStyles((theme: Theme) => ({
	sTableRow: {
		position: 'relative'
	},
	sImage: {
		height: theme.spacing(3.5),
		width: theme.spacing(3.5)
	},
	sImageGrey: {
		filter: 'grayscale(100%)'
	},
	sImageBackground: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c15, 0.7)
	},
	sLabel: {
		fontSize: theme.typography.pxToRem(13),
		left: theme.typography.pxToRem(35),
		padding: 0,
		position: 'absolute',
		top: theme.typography.pxToRem(-2)
	}
}));
