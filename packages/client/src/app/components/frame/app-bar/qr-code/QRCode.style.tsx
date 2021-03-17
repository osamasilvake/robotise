import { makeStyles, Theme } from '@material-ui/core';

export const qrCodeStyles = makeStyles((theme: Theme) => ({
	sQRCodeAvatar: {
		cursor: 'zoom-in',
		marginRight: theme.spacing(1)
	},
	sQRCodeTooltip: {
		padding: theme.spacing(0.25, 0.25, 0.75)
	},
	sQRCodeAvatarTooltip: {
		height: theme.spacing(22),
		marginTop: theme.spacing(0.6),
		width: theme.spacing(22)
	}
}));
