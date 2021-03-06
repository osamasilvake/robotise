import { ThemeOptions } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';

import { AppConfigService } from './services';
import { pxToRem } from './utilities/methods/PixelsToRem';

/**
 * theme settings
 * @param isDarkMode
 */
export const ThemeSettings = (isDarkMode: boolean): ThemeOptions => (isDarkMode ? Dark : Light);

// common palette
const palette: PaletteOptions = {
	primary: {
		main: AppConfigService.AppVariables.colors.c4
	},
	secondary: {
		main: AppConfigService.AppVariables.colors.c1
	}
};

// common overrides
const overrides: Overrides = {
	MuiAvatar: {
		img: {
			objectFit: 'contain'
		},
		square: {
			borderRadius: 0
		}
	},
	MuiButton: {
		root: {
			height: pxToRem(44)
		},
		contained: {
			backgroundColor: AppConfigService.AppVariables.colors.c4,
			color: AppConfigService.AppVariables.colors.c6,
			'&:hover': {
				backgroundColor: AppConfigService.AppVariables.colors.c4,
				opacity: 0.9
			}
		}
	},
	MuiIconButton: {
		root: {
			borderRadius: pxToRem(2)
		}
	},
	MuiListItem: {
		root: {
			'&$button': {
				'&:hover': {
					backgroundColor: AppConfigService.AppVariables.colors.c4,
					'& svg, span, p': {
						color: AppConfigService.AppVariables.colors.c6
					}
				},
				'&.active': {
					backgroundColor: AppConfigService.AppVariables.colors.c4,
					'& svg, span, p': {
						color: AppConfigService.AppVariables.colors.c6
					}
				}
			}
		}
	},
	MuiDrawer: {
		paperAnchorDockedLeft: {
			borderRight: 0
		}
	}
};

// theme: light
const Light: ThemeOptions = {
	palette: {
		...palette,
		type: 'light',
		background: {
			default: AppConfigService.AppVariables.colors.c2
		}
	},
	overrides: {
		...overrides,
		MuiPaper: {
			root: {
				backgroundColor: AppConfigService.AppVariables.colors.c6
			}
		},
		MuiAppBar: {
			root: {
				backgroundColor: AppConfigService.AppVariables.colors.c6,
				color: AppConfigService.AppVariables.colors.c3,
				boxShadow: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
					AppConfigService.AppVariables.colors.c8
				}`
			}
		},
		MuiDrawer: {
			...overrides.MuiDrawer,
			paper: {
				background: AppConfigService.AppVariables.colors.c6,
				color: AppConfigService.AppVariables.colors.c3,
				boxShadow: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
					AppConfigService.AppVariables.colors.c8
				}`
			}
		},
		MuiOutlinedInput: {
			input: {
				'&:-webkit-autofill': {
					WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
						AppConfigService.AppVariables.colors.c6
					} inset`,
					'&::first-line': {
						fontSize: pxToRem(16),
						fontFamily: AppConfigService.AppOptions.fontFamily.Roboto
					}
				}
			}
		}
	}
};

// theme: dark
const Dark: ThemeOptions = {
	palette: {
		...palette,
		type: 'dark',
		background: {
			default: AppConfigService.AppVariables.colors.c3
		}
	},
	overrides: {
		...overrides,
		MuiPaper: {
			root: {
				backgroundColor: AppConfigService.AppVariables.colors.c5
			}
		},
		MuiAppBar: {
			root: {
				backgroundColor: AppConfigService.AppVariables.colors.c5,
				boxShadow: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
					AppConfigService.AppVariables.colors.c7
				}`,
				color: AppConfigService.AppVariables.colors.c2
			}
		},
		MuiDrawer: {
			...overrides.MuiDrawer,
			paper: {
				background: AppConfigService.AppVariables.colors.c5,
				boxShadow: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
					AppConfigService.AppVariables.colors.c7
				}`,
				color: AppConfigService.AppVariables.colors.c2
			}
		},
		MuiOutlinedInput: {
			input: {
				'&:-webkit-autofill': {
					WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
						AppConfigService.AppVariables.colors.c5
					} inset`,
					'&::first-line': {
						fontSize: pxToRem(16),
						fontFamily: AppConfigService.AppOptions.fontFamily.Roboto
					}
				}
			}
		}
	}
};
