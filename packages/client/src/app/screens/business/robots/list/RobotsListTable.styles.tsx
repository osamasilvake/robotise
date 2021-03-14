import { makeStyles } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../services';

const minusContentHeight = AppConfigService.AppOptions.table.minusContentHeight;
export const robotsListTableStyles = makeStyles(() => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${minusContentHeight}px)`
	}
}));
