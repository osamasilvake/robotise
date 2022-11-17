import { Badge } from '@mui/material';
import { badgeClasses } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import { AppConfigService } from '../../services';

export const StyledBadge = styled(Badge)(({ theme }) => ({
	[`& .${badgeClasses.badge}`]: {
		backgroundColor: AppConfigService.AppOptions.colors.c10v1,
		boxShadow: `0 0 0 ${theme.typography.pxToRem(2)} ${theme.palette.background.paper}`,
		color: AppConfigService.AppOptions.colors.c10v1,
		'&::after': {
			animation: 'ripple 1.2s infinite ease-in-out',
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
	[`&.Mui-dot-red .${badgeClasses.badge}`]: {
		backgroundColor: AppConfigService.AppOptions.colors.c12,
		boxShadow: `0 0 0 ${theme.typography.pxToRem(2)} ${AppConfigService.AppOptions.colors.c7}`,
		color: AppConfigService.AppOptions.colors.c12
	},
	[`&.Mui-dot-orange .${badgeClasses.badge}`]: {
		backgroundColor: AppConfigService.AppOptions.colors.c14,
		boxShadow: `0 0 0 ${theme.typography.pxToRem(2)} ${AppConfigService.AppOptions.colors.c7}`,
		color: AppConfigService.AppOptions.colors.c14
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
