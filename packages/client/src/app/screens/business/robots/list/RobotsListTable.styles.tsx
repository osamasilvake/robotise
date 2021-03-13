import { makeStyles } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../services';

const tableMaxHeight = AppConfigService.AppOptions.table.maxHeight;
export const robotsListTableStyles = makeStyles(() => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${tableMaxHeight}px)`
	}
}));
