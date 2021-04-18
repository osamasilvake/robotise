import { makeStyles, Theme } from '@material-ui/core';

export const QRCodeStyles = makeStyles((theme: Theme) => ({
	sQRCodeAvatarTooltip: {
		height: theme.spacing(22),
		marginTop: theme.spacing(0.6),
		width: theme.spacing(22)
	},
	sQRCodeAvatar: {
		marginRight: theme.spacing(0.5)
	}
}));
