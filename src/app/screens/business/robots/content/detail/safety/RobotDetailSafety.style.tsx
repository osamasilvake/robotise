import { makeStyles, Theme } from '@material-ui/core/styles';

export const RobotDetailSafetyStyles = makeStyles((theme: Theme) => ({
	sStateContainer: {
		marginTop: theme.spacing(4)
	},
	sGridContainer: {
		margin: theme.spacing(1.5, 0, 0)
	},
	sList: {
		paddingBottom: 0
	},
	sListSubheader: {
		alignItems: 'center',
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'space-between'
	}
}));
