import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const RobotPurchaseHeadStyle = makeStyles((theme: Theme) => ({
	sHeadBox: {
		margin: theme.spacing(2.5, 0, 1)
	},
	sHeadBilled: {
		marginBottom: theme.spacing(0.4)
	}
}));
