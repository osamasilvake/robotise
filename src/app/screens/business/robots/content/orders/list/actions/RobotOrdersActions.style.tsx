import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotOrdersActionsStyle = makeStyles((theme: Theme) => ({
	sActions: {
		marginBottom: theme.spacing(0.1),
		padding: theme.spacing(0, 2)
	},
	sNotificationTypes: {
		marginTop: theme.spacing(1)
	}
}));
