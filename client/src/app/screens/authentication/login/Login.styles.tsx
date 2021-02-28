import { makeStyles } from '@material-ui/core';

import { ConfigService } from '../../../services';
import { pxToRem } from '../../../utilities/methods/PixelsToRem';
import { randomNum } from '../../../utilities/methods/RandomNum';

export const loginStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
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
	content: {
		backgroundColor: theme.palette.background.default
	},
	paper: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing(8, 4)
	},
	large: {
		borderRadius: 0,
		margin: '20px 0',
		width: theme.spacing(20)
	},
	form: {
		marginTop: theme.spacing(1)
	},
	input: {
		'&:-webkit-autofill': {
			WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,

			'&::first-line': {
				fontSize: pxToRem(16),
				fontFamily: ConfigService.AppOptions.fontFamily.Roboto
			}
		}
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));
