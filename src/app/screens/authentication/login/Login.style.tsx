import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../services';
import { randomNum } from '../../../utilities/methods/Number';

export const LoginStyle = makeStyles((theme: Theme) => ({
	sRoot: {
		height: '100vh'
	},
	sImage: {
		backgroundImage: `url(${
			AppConfigService.AppImageURLs.robotise.path +
			randomNum(1, 5) +
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
		marginTop: theme.spacing(6)
	},
	sFormCheckbox: {
		marginBottom: theme.spacing(0.5),
		marginTop: 0
	},
	sSubmit: {
		margin: theme.spacing(3, 0, 2)
	}
}));
