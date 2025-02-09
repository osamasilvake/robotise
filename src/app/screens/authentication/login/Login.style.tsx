import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

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
	sBox: {
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
	},
	sForgetPassword: {
		textAlign: 'center'
	}
}));
