import { Overrides } from '@material-ui/core/styles/overrides';

import { AppConfigService } from '../../services';
import { pxToRem } from '../../utilities/methods/PixelsToRem';

const OverridesCustom: Overrides = {
	MuiCssBaseline: {
		'@global': {
			html: {
				height: '100%',
				overflow: 'hidden'
			},
			body: {
				height: '100%',
				overflowY: 'auto'
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
			padding: pxToRem(15),
			'&:last-child': {
				paddingBottom: pxToRem(15)
			}
		}
	},
	MuiButton: {
		root: {
			height: pxToRem(44)
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
	}
};
export default OverridesCustom;
