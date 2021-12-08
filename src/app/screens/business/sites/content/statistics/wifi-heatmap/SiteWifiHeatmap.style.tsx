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
	},
	cCard: {
		position: 'relative'
	},
	sLegend: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		backgroundColor: 'white',
		padding: theme.spacing(0.5)
	},
	sColorBox: {
		height: theme.typography.pxToRem(20),
		width: theme.typography.pxToRem(20)
	},
	sRectangle: {
		cursor: 'pointer',
		height: theme.typography.pxToRem(4),
		left: 0,
		position: 'absolute',
		width: theme.typography.pxToRem(4)
	}
}));
