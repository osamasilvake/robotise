import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../../../services';

export const RobotContentDetailAlertsStyles = makeStyles((theme: Theme) => ({
	sGridContainer: {
		marginTop: theme.spacing(4)
	},
	sCardTooltip: {
		padding: theme.spacing(0.5)
	},
	sCardContent: {
		color: AppConfigService.AppVariables.colors.c7,
		minHeight: 130
	},
	sCardDanger: {
		backgroundColor: AppConfigService.AppVariables.colors.c12
	},
	sCardWarning: {
		backgroundColor: AppConfigService.AppVariables.colors.c11
	},
	sCardOther: {
		backgroundColor: AppConfigService.AppVariables.colors.c13
	},
	sCardContentMessage: {
		fontWeight: 500,
		lineHeight: 1.4,
		marginTop: theme.spacing(1),
		wordBreak: 'break-word'
	}
}));
