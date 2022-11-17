import { Components } from '@mui/material/styles';

import { AppConfigService } from '../../services';
import { pxToRem } from '../../utilities/methods/Number';

const ComponentsCustom: Components = {
	MuiCssBaseline: {
		styleOverrides: {
			body: {
				overscrollBehavior: 'none'
			},
			'::selection': {
				backgroundColor: AppConfigService.AppOptions.colors.c9,
				color: AppConfigService.AppOptions.colors.c7
			},
			img: {
				maxWidth: '100%'
			},
			a: {
				color: AppConfigService.AppOptions.colors.c9
			}
		}
	},
	MuiDrawer: {
		styleOverrides: {
			paperAnchorDockedLeft: {
				borderRight: 0
			}
		}
	},
	MuiTabs: {
		styleOverrides: {
			indicator: {
				backgroundColor: 'transparent',
				transition: 'none'
			}
		}
	},
	MuiListItemButton: {
		styleOverrides: {
			root: {
				transition: 'none'
			}
		}
	},
	MuiFormHelperText: {
		styleOverrides: {
			root: {
				marginLeft: 0
			}
		}
	},
	MuiButton: {
		styleOverrides: {
			root: {
				borderRadius: pxToRem(2),
				height: pxToRem(38),
				transition: 'none'
			},
			outlined: {
				'&.selected': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					color: AppConfigService.AppOptions.colors.c7,
					cursor: 'default',
					pointerEvents: 'none',
					'&.Mui-disabled': {
						opacity: 0.7
					}
				}
			},
			contained: {
				backgroundColor: AppConfigService.AppOptions.colors.c9,
				color: AppConfigService.AppOptions.colors.c7,
				'&:hover': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					opacity: 0.9
				}
			}
		}
	},
	MuiAvatar: {
		styleOverrides: {
			img: {
				objectFit: 'contain'
			},
			square: {
				borderRadius: 0
			}
		}
	},
	MuiCardContent: {
		styleOverrides: {
			root: {
				'&:last-child': {
					paddingBottom: pxToRem(16)
				}
			}
		}
	}
};
export default ComponentsCustom;
