import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailAlertsStyle = makeStyles((theme: Theme) => ({
	sAlertsContainer: {
		marginTop: theme.spacing(4)
	},
	sCardContent: {
		minHeight: 135,
		position: 'relative'
	},
	sCardDanger: {
		backgroundColor: AppConfigService.AppOptions.colors.c12,
		color: AppConfigService.AppOptions.colors.c7
	},
	sCardWarning: {
		backgroundColor: AppConfigService.AppOptions.colors.c11,
		color: AppConfigService.AppOptions.colors.c8
	},
	sCardContentIcons: {
		position: 'absolute',
		right: 0,
		top: 0
	},
	sCardContentMessage: {
		fontWeight: 400,
		lineHeight: 1.4,
		marginTop: theme.spacing(1),
		wordBreak: 'break-word'
	}
}));
