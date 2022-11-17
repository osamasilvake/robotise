import { buttonClasses } from '@mui/material/Button';
import { speedDialClasses } from '@mui/material/SpeedDial';
import { speedDialActionClasses } from '@mui/material/SpeedDialAction';
import { alpha, Components } from '@mui/material/styles';
import { switchClasses } from '@mui/material/Switch';

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
					[`&.${buttonClasses.disabled}`]: {
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
	MuiButtonBase: {
		styleOverrides: {
			root: {
				[`&.${speedDialClasses.fab}`]: {
					height: pxToRem(46),
					width: pxToRem(46)
				},
				[`&.${speedDialActionClasses.fab}`]: {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					color: AppConfigService.AppOptions.colors.c7,
					transition: 'none',
					'&:hover': {
						backgroundColor: AppConfigService.AppOptions.colors.c9,
						opacity: 0.95
					}
				}
			}
		}
	},
	MuiSwitch: {
		styleOverrides: {
			switchBase: {
				color: AppConfigService.AppOptions.colors.c9,
				[`&.${switchClasses.checked}`]: {
					color: AppConfigService.AppOptions.colors.c9,
					[`+.${switchClasses.track}`]: {
						backgroundColor: AppConfigService.AppOptions.colors.c9
					},
					[`&.${switchClasses.disabled}`]: {
						color: alpha(AppConfigService.AppOptions.colors.c9, 0.5)
					},
					'&:hover': {
						backgroundColor: 'transparent'
					}
				},
				'&:hover': {
					backgroundColor: 'transparent'
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
