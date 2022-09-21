import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailRemoteSafetyResetStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(4)
	},
	sTitle: {
		marginBottom: theme.spacing(1.5)
	},
	sButtonSVGMain: {
		backgroundColor: AppConfigService.AppOptions.colors.c4,
		borderRadius: '50%',
		display: 'inline-block',
		marginRight: theme.typography.pxToRem(8),
		position: 'relative',
		'&::before': {
			backgroundColor: AppConfigService.AppOptions.colors.c9,
			borderRadius: 'inherit',
			content: '""',
			height: theme.typography.pxToRem(16),
			left: theme.typography.pxToRem(2),
			position: 'absolute',
			top: theme.typography.pxToRem(2),
			width: theme.typography.pxToRem(16),
			zIndex: AppConfigService.AppOptions.styles.zIndex.level1
		}
	},
	sButtonSVG: {
		display: 'block'
	},
	sButtonSVGProgress: {
		height: theme.typography.pxToRem(20),
		transform: 'rotate(-90deg)',
		width: theme.typography.pxToRem(20)
	},
	sButtonSVGCircle: {
		strokeDasharray: 'var(--progress-array, 0) 52',
		strokeWidth: 17,
		stroke: AppConfigService.AppOptions.colors.c9,
		transition: 'stroke-dasharray var(--duration) linear'
	},
	sInfo: {
		marginTop: theme.spacing(1)
	}
}));
