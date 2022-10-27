import { alpha, Components } from '@mui/material/styles';

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
				transition: 'none',
				'&:hover': {
					'&.Mui-selected': {
						backgroundColor: AppConfigService.AppOptions.colors.c9,
						'& > svg, span': {
							color: AppConfigService.AppOptions.colors.c7
						}
					}
				},
				'&.Mui-selected': {
					backgroundColor: AppConfigService.AppOptions.colors.c9,
					'& > svg, span': {
						color: AppConfigService.AppOptions.colors.c7
					}
				}
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
