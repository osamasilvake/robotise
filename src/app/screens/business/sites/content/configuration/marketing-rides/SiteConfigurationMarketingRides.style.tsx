import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SiteConfigurationMarketingRidesStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sTimes: {
		marginTop: theme.spacing(2)
	},
	sTimeLabel: {
		width: theme.typography.pxToRem(120)
	}
}));
