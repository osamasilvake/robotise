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
		opacity: 0.95,
		padding: theme.spacing(0.5),
		position: 'absolute',
		right: 0,
		top: 0
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
