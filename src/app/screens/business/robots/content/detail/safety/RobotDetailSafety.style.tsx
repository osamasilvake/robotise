import { alpha, makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailSafetyStyle = makeStyles((theme: Theme) => ({
	sStateContainer: {
		marginTop: theme.spacing(4)
	},
	sGridContainer: {
		marginTop: theme.spacing(0.5)
	},
	sList: {
		paddingBottom: 0
	},
	sListSubheader: {
		alignItems: 'center',
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'space-between'
	},
	sListItem: {
		pointerEvents: 'none'
	},
	sListItemWarning: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c11, 0.15)
	}
}));
