import { alpha, makeStyles } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../../services';

export const RobotPurchaseDetailTableStyles = makeStyles(() => ({
	sTableBody: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c10, 0.1)
	}
}));
