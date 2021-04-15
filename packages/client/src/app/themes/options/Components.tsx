import { Components } from '@material-ui/core/styles/components';

import { AppConfigService } from '../../services';
import { pxToRem } from '../../utilities/methods/PixelsToRem';

const OverridesCustom: Components = {
	MuiCssBaseline: {
		styleOverrides: {
			body: {
				overscrollBehaviorY: 'none'
			},
			'::selection': {
				backgroundColor: AppConfigService.AppOptions.colors.c9,
				color: AppConfigService.AppOptions.colors.c7
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
	MuiPopover: {
		styleOverrides: {
			paper: {
				borderRadius: 0
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
	MuiListItem: {
		styleOverrides: {
			root: {
				'&:hover': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					'& svg, span, p': {
						color: AppConfigService.AppOptions.colors.c4
					}
				},
				'&.active': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					'& svg, span, p': {
						color: AppConfigService.AppOptions.colors.c4
					}
				}
			},
			button: {
				transition: 'none'
			}
		}
	},
	MuiListItemIcon: {
		styleOverrides: {
			root: {
				color: AppConfigService.AppOptions.colors.c8a
			}
		}
	},
	MuiCardContent: {
		styleOverrides: {
			root: {
				padding: 0,
				'&:last-child': {
					paddingBottom: 0
				}
			}
		}
	},
	MuiButton: {
		styleOverrides: {
			root: {
				borderRadius: pxToRem(2),
				height: pxToRem(42)
			},
			outlined: {
				border: `${pxToRem(1)} solid ${AppConfigService.AppOptions.colors.c9}`,
				color: AppConfigService.AppOptions.colors.c9,
				'&:hover': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					color: AppConfigService.AppOptions.colors.c5
				}
			},
			contained: {
				backgroundColor: AppConfigService.AppOptions.colors.c9,
				color: AppConfigService.AppOptions.colors.c5,
				'&:hover': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					opacity: 0.9
				}
			}
		}
	},
	MuiCheckbox: {
		styleOverrides: {
			root: {
				paddingBottom: pxToRem(3),
				paddingTop: pxToRem(3)
			}
		}
	},
	MuiIconButton: {
		styleOverrides: {
			root: {
				borderRadius: pxToRem(2)
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
	MuiFab: {
		styleOverrides: {
			sizeSmall: {
				backgroundColor: AppConfigService.AppOptions.colors.c9,
				color: AppConfigService.AppOptions.colors.c5,
				'&:hover': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					opacity: 0.95
				}
			}
		}
	},
	MuiOutlinedInput: {
		styleOverrides: {
			input: {
				filter: 'none'
			}
		}
	}
};
export default OverridesCustom;
