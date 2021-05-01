import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../services';

export const ScrollTopStyles = makeStyles((theme: Theme) => ({
	sScrollTop: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		zIndex: AppConfigService.AppOptions.styles.zIndex.level2
	}
}));
