import { Overrides } from '@material-ui/core/styles/overrides';

import { AppConfigService } from '../../services';
import { pxToRem } from '../../utilities/methods/PixelsToRem';

const OverridesCustom: Overrides = {
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
	MuiFab: {
		sizeSmall: {
			backgroundColor: AppConfigService.AppVariables.colors.c4,
			color: AppConfigService.AppVariables.colors.c6,
			'&:hover': {
				backgroundColor: AppConfigService.AppVariables.colors.c4,
				opacity: 0.95
			}
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
export default OverridesCustom;
