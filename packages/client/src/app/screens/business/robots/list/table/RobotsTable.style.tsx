import { fade, makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.minusContentHeight;
export const RobotsListStyles = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTableRowWarning: {
		backgroundColor: fade(AppConfigService.AppOptions.colors.c11, 0.15)
	},
	sTableRowDanger: {
		backgroundColor: fade(AppConfigService.AppOptions.colors.c12, 0.15)
	}
}));
