import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SetupWifiConfigStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sExcerpt: {
		marginBottom: theme.spacing(1.5)
	},
	sSubmit: {
		marginTop: theme.spacing(1)
	},
	sPreviewButton: {
		cursor: 'default',
		marginLeft: theme.spacing(1)
	},
	sPreview: {
		whiteSpace: 'pre-wrap'
	}
}));
