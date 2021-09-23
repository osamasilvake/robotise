import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight2;
export const SiteProductsTableStyle = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sEditProduct: {
		marginRight: theme.spacing(0.5)
	},
	sAvatarBackground: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c15, 0.7)
	}
}));
