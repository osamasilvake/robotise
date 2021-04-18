import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../services';
import { randomNum } from '../../../utilities/methods/RandomNum';

export const LoginStyles = makeStyles((theme: Theme) => ({
	sRoot: {
		height: '100vh'
	},
	sImage: {
		backgroundImage: `url(${
			AppConfigService.AppImageURLs.robotise.path +
			randomNum(1, 7) +
			AppConfigService.AppImageURLs.robotise.format
		})`,
		backgroundPosition: 'center',
		backgroundPositionX: '50%',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	},
	sPaper: {
		flexDirection: 'column',
		margin: theme.spacing(14, 4, 4)
	},
	sAvatar: {
		margin: `${theme.spacing(3)} auto`,
		width: theme.spacing(20)
	},
	sForm: {
		marginTop: theme.spacing(2)
	},
	sFormCheckbox: {
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(0.6)
	},
	sSubmit: {
		margin: theme.spacing(3, 0, 2)
	}
}));
