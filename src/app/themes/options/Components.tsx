import { alpha } from '@material-ui/core/styles';
import { Components } from '@material-ui/core/styles/components';

import { AppConfigService } from '../../services';
import { pxToRem } from '../../utilities/methods/PixelsToRem';

const OverridesCustom: Components = {
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
	MuiPopover: {
		styleOverrides: {
			paper: {
				borderRadius: 0
			}
		}
	},
	MuiListItem: {
		styleOverrides: {
			root: {
				'&.active': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					'& svg, span, p': {
						color: AppConfigService.AppOptions.colors.c7
					}
				}
			},
			button: {
				transition: 'none'
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
	MuiChip: {
		styleOverrides: {
			root: {
				transition: 'none'
			}
		}
	},
	MuiFormControl: {
		styleOverrides: {
			fullWidth: {
				display: 'flex'
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
	MuiDialogTitle: {
		styleOverrides: {
			root: {
				padding: `${pxToRem(15)} ${pxToRem(20)}`
			}
		}
	},
	MuiDialogContent: {
		styleOverrides: {
			root: {
				padding: `${pxToRem(0)} ${pxToRem(20)} ${pxToRem(5)}`
			}
		}
	},
	MuiDialogActions: {
		styleOverrides: {
			root: {
				padding: `${pxToRem(10)} ${pxToRem(20)}`
			}
		}
	},
	MuiButton: {
		styleOverrides: {
			root: {
				borderRadius: pxToRem(2),
				height: pxToRem(40),
				transition: 'none'
			},
			outlined: {
				border: `${pxToRem(1)} solid ${AppConfigService.AppOptions.colors.c9}`,
				color: AppConfigService.AppOptions.colors.c9,
				'&:hover': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					color: AppConfigService.AppOptions.colors.c7
				},
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
	MuiSwitch: {
		styleOverrides: {
			switchBase: {
				color: AppConfigService.AppOptions.colors.c9,
				'&.Mui-checked': {
					color: AppConfigService.AppOptions.colors.c9,
					'+.MuiSwitch-track': {
						backgroundColor: AppConfigService.AppOptions.colors.c9
					},
					'&:hover': {
						backgroundColor: 'transparent'
					},
					'&.Mui-disabled': {
						color: alpha(AppConfigService.AppOptions.colors.c9, 0.5)
					}
				},
				'&:hover': {
					backgroundColor: 'transparent'
				}
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
				color: AppConfigService.AppOptions.colors.c7,
				'&:hover': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					opacity: 0.95
				}
			}
		}
	},
	MuiOutlinedInput: {
		styleOverrides: {
			root: {
				borderRadius: pxToRem(2)
			},
			input: {
				filter: 'none'
			}
		}
	}
};
export default OverridesCustom;
