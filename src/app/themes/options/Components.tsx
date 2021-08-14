import { alpha } from '@material-ui/core/styles';
import { Components } from '@material-ui/core/styles/components';

import { AppConfigService } from '../../services';
import { pxToRem } from '../../utilities/methods/Number';

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
	MuiListItem: {
		styleOverrides: {
			root: {
				'&.active': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					'& svg, span, p': {
						color: AppConfigService.AppOptions.colors.c7
					}
				},
				'&.Mui-selected': {
					'&:hover': {
						backgroundColor: AppConfigService.AppOptions.colors.c9,
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
				},
				'&.MuiButton-outlinedError': {
					'&:hover': {
						backgroundColor: AppConfigService.AppOptions.colors.c12,
						color: AppConfigService.AppOptions.colors.c7
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
				'&.MuiSpeedDial-fab': {
					height: pxToRem(46),
					width: pxToRem(46)
				},
				'&.MuiSpeedDialAction-fab': {
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
	MuiAvatar: {
		styleOverrides: {
			img: {
				objectFit: 'contain'
			},
			square: {
				borderRadius: 0
			}
		}
	}
};
export default OverridesCustom;
