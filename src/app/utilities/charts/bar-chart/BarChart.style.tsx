import { alpha } from '@mui/material/styles';

import { AppConfigService } from '../../../services';
import { pxToRem } from '../../methods/Number';

export const BarChartStyle = {
	sBox: {
		width: '100%',
		height: pxToRem(250)
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
	},
	sBar: {
		fill: AppConfigService.AppOptions.colors.c10v1
	}
};
