import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../services';

export const qrCodeStyles = makeStyles((theme: Theme) => ({
	sQRCode: {
		backgroundColor:
			theme.palette.type === 'dark'
				? AppConfigService.AppVariables.colors.c1
				: AppConfigService.AppVariables.colors.c4,
		padding: 0,
		textAlign: 'center'
	},
	sQRCodeAvatar: {
		cursor: 'zoom-in',
		marginRight: theme.spacing(1)
	},
	sQRCodeTooltip: {
		padding: theme.spacing(0.75, 0.25, 0.25)
	},
	sQRCodeAvatarTooltip: {
		height: theme.spacing(22),
		marginTop: theme.spacing(0.6),
		width: theme.spacing(22)
	}
}));
