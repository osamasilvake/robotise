import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../../../services';

export const robotContentDetailAlertsStyles = makeStyles((theme: Theme) => ({
	sGridContainer: {
		marginTop: theme.spacing(4)
	},
	sCardDanger: {
		backgroundColor: AppConfigService.AppVariables.colors.c12
	},
	sCardWarning: {
		backgroundColor: AppConfigService.AppVariables.colors.c11v1
	},
	sCardInfo: {
		backgroundColor: AppConfigService.AppVariables.colors.c13
	},
	sCardContent: {
		color: AppConfigService.AppVariables.colors.c7
	},
	sCardContentMessage: {
		fontWeight: 500,
		lineHeight: 1.4,
		marginTop: theme.spacing(1),
		wordBreak: 'break-word'
	}
}));
