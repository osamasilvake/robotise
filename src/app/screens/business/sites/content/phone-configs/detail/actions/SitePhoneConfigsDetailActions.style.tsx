import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

export const SitePhoneConfigsDetailActionsStyle = makeStyles((theme: Theme) => ({
	sActions: {
		marginBottom: theme.spacing(2),
		padding: theme.spacing(1, 2),
		position: 'sticky',
		top: 0,
		zIndex: AppConfigService.AppOptions.styles.zIndex.level3
	}
}));
