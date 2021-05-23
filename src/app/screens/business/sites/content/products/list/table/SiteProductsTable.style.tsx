import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight2;
export const SiteProductsTableStyles = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sEditProduct: {
		marginRight: theme.spacing(0.5)
	},
	sImageUpload: {
		marginTop: theme.spacing(0.5)
	},
	sImageInfo: {
		marginTop: theme.spacing(1)
	}
}));
