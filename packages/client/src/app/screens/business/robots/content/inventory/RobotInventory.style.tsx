import { makeStyles, Theme } from '@material-ui/core/styles';

export const RobotsInventoryStyles = makeStyles((theme: Theme) => ({
	sTitleBox: {
		margin: theme.spacing(2.5, 0, 1.5)
	},
	sImage: {
		height: theme.spacing(6),
		width: theme.spacing(6)
	},
	sTableContainer: {
		marginBottom: theme.spacing(5)
	}
}));
