import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight1;
export const SitesListStyles = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	}
}));
