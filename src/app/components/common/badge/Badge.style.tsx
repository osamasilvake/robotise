import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../services';

export const BadgeStyle = makeStyles((theme: Theme) => ({
	sDot: {
		backgroundColor: AppConfigService.AppOptions.colors.c10v1,
		boxShadow: `0 0 0 ${theme.typography.pxToRem(2)} ${theme.palette.background.paper}`,
		color: AppConfigService.AppOptions.colors.c10v1,
		'&::after': {
			animation: '$ripple 1.2s infinite ease-in-out',
			border: `${theme.typography.pxToRem(1)} solid currentColor`,
			borderRadius: '50%',
			content: '""',
			height: '100%',
			left: 0,
			position: 'absolute',
			top: 0,
			width: '100%'
		}
	},
	'@keyframes ripple': {
		'0%': {
			opacity: 1,
			transform: 'scale(.8)'
		},
		'100%': {
			opacity: 0,
			transform: 'scale(2.4)'
		}
	}
}));
