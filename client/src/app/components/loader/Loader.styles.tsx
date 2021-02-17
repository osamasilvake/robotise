import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(15),
		height: theme.spacing(15)
	},
	spinner: {
		color: 'var(--c4)'
	}
}));
