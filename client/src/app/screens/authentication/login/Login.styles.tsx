import { makeStyles } from '@material-ui/core';

import { AppImageURLs, AppOptions } from '../../../../app.config';
import { pxToRem } from '../../../utilities/methods/pxToRem';
import { getRandomInt } from '../../../utilities/methods/randomNum';

export const loginStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage: `url(${
			AppImageURLs.robotise.path + getRandomInt(1, 3) + AppImageURLs.robotise.format
		})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	content: {
		backgroundColor: theme.palette.background.default
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	large: {
		borderRadius: 0,
		margin: '20px 0',
		width: theme.spacing(19)
	},
	form: {
		marginTop: theme.spacing(1)
	},
	input: {
		'&:-webkit-autofill': {
			WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,

			'&::first-line': {
				fontSize: pxToRem(16),
				fontFamily: AppOptions.fontFamily.Roboto
			}
		}
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));
