import { ThemeOptions } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';

import { ConfigService } from './services';
import { pxToRem } from './utilities/methods/PixelsToRem';

/**
 * theme settings
 * @param prefersDarkMode
 */
export const ThemeSettings = (prefersDarkMode: boolean): ThemeOptions =>
	prefersDarkMode ? Dark : Light;

// common palette
const palette: PaletteOptions = {
	primary: {
		main: ConfigService.AppVariables.colors.c4
	},
	secondary: {
		main: ConfigService.AppVariables.colors.c1
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
			backgroundColor: ConfigService.AppVariables.colors.c4,
			color: ConfigService.AppVariables.colors.c6,
			'&:hover': {
				backgroundColor: ConfigService.AppVariables.colors.c4,
				opacity: 0.9
			}
		}
	},
	MuiDrawer: {
		paperAnchorDockedLeft: {
			borderRight: 0
		}
	},
	MuiListItem: {
		root: {
			'&$button': {
				'&:hover': {
					backgroundColor: ConfigService.AppVariables.colors.c4
				},
				'&.active': {
					backgroundColor: ConfigService.AppVariables.colors.c4
				}
			}
		}
	}
};

// theme: light
const Light: ThemeOptions = {
	palette: {
		...palette,
		type: 'light',
		background: {
			default: ConfigService.AppVariables.colors.c2
		}
	},
	overrides: {
		...overrides,
		MuiPaper: {
			root: {
				backgroundColor: ConfigService.AppVariables.colors.c6
			}
		},
		MuiAppBar: {
			root: {
				backgroundColor: ConfigService.AppVariables.colors.c6,
				color: ConfigService.AppVariables.colors.c3,
				boxShadow: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
					ConfigService.AppVariables.colors.c8
				}`
			}
		},
		MuiDrawer: {
			...overrides.MuiDrawer,
			paper: {
				background: ConfigService.AppVariables.colors.c6,
				color: ConfigService.AppVariables.colors.c3,
				boxShadow: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
					ConfigService.AppVariables.colors.c8
				}`
			}
		},
		MuiOutlinedInput: {
			input: {
				'&:-webkit-autofill': {
					WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
						ConfigService.AppVariables.colors.c6
					} inset`,
					'&::first-line': {
						fontSize: pxToRem(16),
						fontFamily: ConfigService.AppOptions.fontFamily.Roboto
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
			default: ConfigService.AppVariables.colors.c3
		}
	},
	overrides: {
		...overrides,
		MuiPaper: {
			root: {
				backgroundColor: ConfigService.AppVariables.colors.c5
			}
		},
		MuiAppBar: {
			root: {
				backgroundColor: ConfigService.AppVariables.colors.c5,
				boxShadow: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
					ConfigService.AppVariables.colors.c7
				}`,
				color: ConfigService.AppVariables.colors.c2
			}
		},
		MuiDrawer: {
			...overrides.MuiDrawer,
			paper: {
				background: ConfigService.AppVariables.colors.c5,
				boxShadow: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(1)} ${
					ConfigService.AppVariables.colors.c7
				}`,
				color: ConfigService.AppVariables.colors.c2
			}
		},
		MuiOutlinedInput: {
			input: {
				'&:-webkit-autofill': {
					WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
						ConfigService.AppVariables.colors.c5
					} inset`,
					'&::first-line': {
						fontSize: pxToRem(16),
						fontFamily: ConfigService.AppOptions.fontFamily.Roboto
					}
				}
			}
		}
	}
};
