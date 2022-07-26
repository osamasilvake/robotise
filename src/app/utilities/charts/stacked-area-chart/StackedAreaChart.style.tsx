import { alpha } from '@mui/material/styles';

import { AppConfigService } from '../../../services';
import { pxToRem } from '../../methods/Number';

export const StackedAreaChartStyle = {
	sBox: {
		width: '100%',
		height: pxToRem(280)
	},
	sCartesianGrid: {
		stroke: AppConfigService.AppOptions.colors.c13
	},
	sAxisLight: {
		fill: alpha(AppConfigService.AppOptions.colors.c7, 0.8),
		fontSize: pxToRem(13)
	},
	sAxisDark: {
		fill: AppConfigService.AppOptions.colors.c2,
		fontSize: pxToRem(13)
	},
	sTooltipLabel: {
		color: AppConfigService.AppOptions.colors.c8
	}
};
