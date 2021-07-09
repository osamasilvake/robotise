import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const RobotOrdersActionsStyle = makeStyles((theme: Theme) => ({
	sFilterBlock: {
		marginBottom: theme.spacing(1)
	},
	sActionBlock: {
		marginTop: theme.spacing(1)
	},
	sCreateOrder: {
		marginTop: theme.spacing(1)
	}
}));
