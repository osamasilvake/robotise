import { alpha } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../../../../../services';

export const RobotPurchaseTableStyle = makeStyles(() => ({
	sTableBody: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c10, 0.1)
	}
}));
