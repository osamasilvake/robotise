import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight1;
export const DeepLinksTableStyle = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTablePagination: {
		opacity: 0.6,
		pointerEvents: 'none'
	},
	sEditDeepLink: {
		marginRight: theme.spacing(0.5)
	}
}));
