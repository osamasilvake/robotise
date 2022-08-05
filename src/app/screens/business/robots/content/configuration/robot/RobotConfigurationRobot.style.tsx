import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotConfigurationRobotStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(2)
	},
	sExcerpt: {
		marginBottom: theme.spacing(1.5)
	},
	sRecursiveTitle: {
		fontWeight: 500,
		marginTop: theme.spacing(1)
	},
	sIntendElement: {
		marginLeft: theme.spacing(4)
	},
	sSubmit: {
		marginTop: theme.spacing(1)
	},
	sSubmitNote: {
		marginTop: theme.spacing(1)
	}
}));
