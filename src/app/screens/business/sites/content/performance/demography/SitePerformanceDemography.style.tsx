import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SitePerformanceDemographyStyle = makeStyles((theme: Theme) => ({
	sTitleLabel: {
		marginBottom: theme.spacing(2)
	},
	sTooltipLabel: {
		marginBottom: theme.spacing(0.5)
	},
	sTooltipInventoryList: {
		marginLeft: theme.spacing(1)
	},
	sTooltipInventoryListItemKey: {
		marginRight: theme.spacing(0.2),
		minWidth: theme.typography.pxToRem(35)
	},
	sTooltipInventoryListItemLabel: {
		marginLeft: theme.spacing(0.2)
	}
}));
