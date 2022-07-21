import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../services';

export const SitePerformanceKPIStyle = makeStyles((theme: Theme) => ({
	sContainer: {
		marginTop: theme.spacing(4)
	},
	sCardContent: {
		position: 'relative'
	},
	sCardContentIcon: {
		color: AppConfigService.AppOptions.colors.c13,
		position: 'absolute',
		right: theme.spacing(0.5),
		top: theme.spacing(0.5)
	},
	sCardContentIconRotate: {
		transform: 'rotate(90deg)'
	},
	sCardContentValue: {
		margin: theme.spacing(1, 0)
	}
}));
