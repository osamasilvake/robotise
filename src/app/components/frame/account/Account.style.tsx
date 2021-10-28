import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const AccountStyle = makeStyles((theme: Theme) => ({
	sAccount: {
		minHeight: theme.spacing(8),
		padding: theme.spacing(0, 1)
	},
	sAvatar: {
		width: '100%'
	},
	sButton: {
		borderRadius: theme.typography.pxToRem(2)
	},
	sDetail: {
		margin: theme.spacing(0, 0, 0, 1),
		textAlign: 'left'
	},
	sDetailSubtitle: {
		marginTop: theme.spacing(-0.25)
	}
}));
