import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const GeneralEmailContentStyle = makeStyles((theme: Theme) => ({
	sBlock1: {
		margin: `${theme.spacing(2)} auto ${theme.spacing(1)}`
	},
	sBlock2: {
		marginBottom: theme.spacing(1.5)
	},
	sError: {
		marginBottom: theme.spacing(2)
	},
	sFrom: {
		marginBottom: theme.spacing(-0.4)
	},
	sContent: {
		whiteSpace: 'pre-wrap'
	}
}));
