import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../services';

export const GeneralEmailsActionsStyle = makeStyles((theme: Theme) => ({
	sActions: {
		marginBottom: theme.spacing(0.1),
		padding: theme.spacing(0, 2),
		position: 'sticky',
		top: 0,
		zIndex: AppConfigService.AppOptions.styles.zIndex.level3
	}
}));
