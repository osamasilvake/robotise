import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const AudioPlayerStyle = makeStyles((theme: Theme) => ({
	sCardContent: {
		padding: theme.spacing(2.5, 3, 1.5)
	},
	sText: {
		marginBottom: theme.spacing(1)
	},
	sTrackProgressGrid: {
		width: 200
	},
	sTimeTicker: {
		marginLeft: theme.spacing(1)
	},
	sListItemText: {
		wordBreak: 'break-all'
	}
}));
