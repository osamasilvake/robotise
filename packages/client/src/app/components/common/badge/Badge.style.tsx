import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../services';

export const badgeStyles = makeStyles((theme: Theme) => ({
	sDot: {
		backgroundColor: AppConfigService.AppVariables.colors.c10,
		boxShadow: `0 0 0 ${theme.typography.pxToRem(2)} ${theme.palette.background.paper}`,
		color: AppConfigService.AppVariables.colors.c10,
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
