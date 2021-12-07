import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SiteWifiHeatmapStyle = makeStyles((theme: Theme) => ({
	sFloor: {
		marginTop: theme.spacing(2)
	},
	sEmpty: {
		marginTop: theme.spacing(1)
	},
	sMap: {
		marginTop: theme.spacing(2)
	}
}));
