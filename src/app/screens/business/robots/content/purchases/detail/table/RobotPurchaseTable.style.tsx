import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

export const RobotPurchaseTableStyle = makeStyles(() => ({
	sTableBody: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c10, 0.1)
	}
}));
