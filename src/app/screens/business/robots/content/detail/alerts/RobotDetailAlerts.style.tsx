import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailAlertsStyles = makeStyles((theme: Theme) => ({
	sAlertsContainer: {
		marginTop: theme.spacing(4)
	},
	sCardContent: {
		color: AppConfigService.AppOptions.colors.c7,
		minHeight: 135,
		position: 'relative'
	},
	sCardDanger: {
		backgroundColor: AppConfigService.AppOptions.colors.c12
	},
	sCardWarning: {
		backgroundColor: AppConfigService.AppOptions.colors.c11
	},
	sCardOther: {
		backgroundColor: AppConfigService.AppOptions.colors.c13
	},
	sCardContentIcons: {
		position: 'absolute',
		right: theme.typography.pxToRem(5),
		top: theme.typography.pxToRem(5)
	},
	sCardContentIcon: {
		color: AppConfigService.AppOptions.colors.c7,
		cursor: 'pointer'
	},
	sCardContentMessage: {
		fontWeight: 500,
		lineHeight: 1.4,
		marginTop: theme.spacing(1),
		wordBreak: 'break-word'
	}
}));
