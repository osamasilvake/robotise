import { makeStyles, Theme } from '@material-ui/core/styles';

export const RobotOrdersActionsStyles = makeStyles((theme: Theme) => ({
	sFloatBoxTopSpace: {
		marginTop: theme.spacing(3)
	},
	sFilterBlock: {
		marginBottom: theme.spacing(1)
	},
	sActionBlock: {
		marginTop: theme.spacing(1)
	},
	sActiveOrders: {
		marginTop: theme.spacing(1)
	},
	sDebug: {
		marginTop: theme.spacing(1)
	},
	sCreateOrder: {
		marginTop: theme.spacing(1)
	}
}));
