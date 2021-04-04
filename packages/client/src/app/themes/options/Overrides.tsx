import { Overrides } from '@material-ui/core/styles/overrides';

import { AppConfigService } from '../../services';
import { pxToRem } from '../../utilities/methods/PixelsToRem';

const OverridesCustom: Overrides = {
	MuiCssBaseline: {
		'@global': {
			body: {
				overscrollBehaviorY: 'none'
			},
			'::selection': {
				backgroundColor: AppConfigService.AppVariables.colors.c9,
				color: AppConfigService.AppVariables.colors.c7
			}
		}
	},
	MuiDrawer: {
		paperAnchorDockedLeft: {
			borderRight: 0
		}
	},
	MuiPopover: {
		paper: {
			borderRadius: 0
		}
	},
	MuiTabs: {
		indicator: {
			backgroundColor: 'transparent',
			transition: 'none'
		}
	},
	MuiListItem: {
		root: {
			'&$button': {
				'&:hover': {
					backgroundColor: AppConfigService.AppVariables.colors.c9,
					'& svg, span, p': {
						color: AppConfigService.AppVariables.colors.c5
					}
				},
				'&.active': {
					backgroundColor: AppConfigService.AppVariables.colors.c9,
					'& svg, span, p': {
						color: AppConfigService.AppVariables.colors.c5
					}
				}
			}
		}
	},
	MuiCardContent: {
		root: {
			padding: 0,
			'&:last-child': {
				paddingBottom: 0
			}
		}
	},
	MuiButton: {
		root: {
			borderRadius: pxToRem(2),
			height: pxToRem(42)
		},
		outlined: {
			border: `${pxToRem(1)} solid ${AppConfigService.AppVariables.colors.c9}`,
			color: AppConfigService.AppVariables.colors.c9,
			'&:hover': {
				backgroundColor: AppConfigService.AppVariables.colors.c9,
				color: AppConfigService.AppVariables.colors.c5
			}
		},
		contained: {
			backgroundColor: AppConfigService.AppVariables.colors.c9,
			color: AppConfigService.AppVariables.colors.c5,
			'&:hover': {
				backgroundColor: AppConfigService.AppVariables.colors.c9,
				opacity: 0.9
			}
		}
	},
	MuiCheckbox: {
		root: {
			paddingBottom: pxToRem(3),
			paddingTop: pxToRem(3)
		}
	},
	MuiIconButton: {
		root: {
			borderRadius: pxToRem(2)
		}
	},
	MuiAvatar: {
		img: {
			objectFit: 'contain'
		},
		square: {
			borderRadius: 0
		}
	},
	MuiFab: {
		sizeSmall: {
			backgroundColor: AppConfigService.AppVariables.colors.c9,
			color: AppConfigService.AppVariables.colors.c5,
			'&:hover': {
				backgroundColor: AppConfigService.AppVariables.colors.c9,
				opacity: 0.95
			}
		}
	},
	MuiOutlinedInput: {
		input: {
			filter: 'none'
		}
	}
};
export default OverridesCustom;
