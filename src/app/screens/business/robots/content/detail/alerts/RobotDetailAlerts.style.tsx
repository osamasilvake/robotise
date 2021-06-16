import { makeStyles, Theme } from '@material-ui/core/styles';

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
		right: theme.typography.pxToRem(5),
		top: theme.typography.pxToRem(5)
	},
	sCardContentIcon: {
		cursor: 'pointer'
	},
	sCardContentMessage: {
		fontWeight: 400,
		lineHeight: 1.4,
		marginTop: theme.spacing(1),
		wordBreak: 'break-word'
	}
}));
