import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../services';

export const ScrollTopStyle = makeStyles((theme: Theme) => ({
	sScrollTop: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		zIndex: AppConfigService.AppOptions.styles.zIndex.level2
	}
}));
