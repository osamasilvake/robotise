import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotElevatorCallsActionsStyle = makeStyles((theme: Theme) => ({
	sActions: {
		marginBottom: theme.spacing(0.1),
		padding: theme.spacing(1.05, 2),
		position: 'sticky',
		top: 0,
		zIndex: AppConfigService.AppOptions.styles.zIndex.level3
	}
}));
