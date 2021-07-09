import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const PageHeadStyle = makeStyles((theme: Theme) => ({
	sTitle: {
		marginBottom: theme.spacing(0.6)
	},
	sDivider: {
		margin: theme.spacing(1, 0, 2.5)
	}
}));
