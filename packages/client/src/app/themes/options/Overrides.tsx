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
			backgroundColor: AppConfigService.AppVariables.colors.c9,
			color: AppConfigService.AppVariables.colors.c5,
			'&:hover': {
				backgroundColor: AppConfigService.AppVariables.colors.c9,
				opacity: 0.9
			}
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
	MuiDrawer: {
		paperAnchorDockedLeft: {
			borderRight: 0
		}
	},
	MuiTabs: {
		indicator: {
			backgroundColor: 'transparent',
			transition: 'none'
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
	MuiIconButton: {
		root: {
			borderRadius: pxToRem(2)
		}
	}
};
export default OverridesCustom;
