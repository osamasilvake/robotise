import { makeStyles, Theme } from '@material-ui/core/styles';

export const centerStyles = makeStyles((theme: Theme) => ({
	sVHFlex: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		justifyContent: 'center',
		padding: theme.spacing(2.5),
		textAlign: 'center'
	},
	sHFlex: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: theme.spacing(15),
		padding: theme.spacing(2),
		textAlign: 'center'
	}
}));
