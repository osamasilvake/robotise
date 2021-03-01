import { makeStyles, Theme } from '@material-ui/core';

import { ConfigService } from '../../../services';
import { pxToRem } from '../../../utilities/methods/PixelsToRem';
import { randomNum } from '../../../utilities/methods/RandomNum';

export const loginStyles = makeStyles((theme: Theme) => ({
	loginRoot: {
		height: '100vh'
	},
	loginImage: {
		backgroundImage: `url(${
			ConfigService.AppImageURLs.robotise.path +
			randomNum(1, 8) +
			ConfigService.AppImageURLs.robotise.format
		})`,
		backgroundPosition: 'center',
		backgroundPositionX: '30%',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	},
	loginContent: {
		backgroundColor: theme.palette.background.default
	},
	loginPaper: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing(8, 4)
	},
	loginAvatar: {
		borderRadius: 0,
		margin: theme.spacing(3, 0),
		width: theme.spacing(20)
	},
	loginForm: {
		marginTop: theme.spacing(1)
	},
	loginInput: {
		'&:-webkit-autofill': {
			WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,

			'&::first-line': {
				fontSize: pxToRem(16),
				fontFamily: ConfigService.AppOptions.fontFamily.Roboto
			}
		}
	},
	loginSubmit: {
		margin: theme.spacing(3, 0, 2)
	}
}));
