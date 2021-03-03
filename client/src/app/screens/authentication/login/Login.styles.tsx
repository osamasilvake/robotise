import { makeStyles, Theme } from '@material-ui/core';

import { ConfigService } from '../../../services';
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
	loginPaper: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing(8, 4)
	},
	loginAvatar: {
		margin: theme.spacing(3, 0),
		width: theme.spacing(20)
	},
	loginForm: {
		marginTop: theme.spacing(1)
	},
	loginSubmit: {
		margin: theme.spacing(3, 0, 2)
	}
}));
