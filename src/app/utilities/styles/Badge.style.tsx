import { Badge, styled } from '@mui/material';

import { AppConfigService } from '../../services';

export const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
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
	'&.Mui-dot-red .MuiBadge-badge': {
		backgroundColor: AppConfigService.AppOptions.colors.c12,
		color: AppConfigService.AppOptions.colors.c12
	},
	'&.Mui-dot-orange .MuiBadge-badge': {
		backgroundColor: AppConfigService.AppOptions.colors.c14,
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
