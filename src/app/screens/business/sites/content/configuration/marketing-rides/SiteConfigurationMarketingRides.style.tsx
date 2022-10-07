import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SiteConfigurationMarketingRidesStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3),
		position: 'relative'
	},
	sActivate: {
		position: 'absolute',
		right: 0,
		top: 0
	},
	sLocations: {
		maxWidth: theme.typography.pxToRem(400)
	},
	sTimes: {
		marginTop: theme.spacing(2)
	},
	sTimesList: {
		columnCount: 4,
		columnGap: 20,
		[theme.breakpoints.down('lg')]: {
			columnCount: 3
		},
		[theme.breakpoints.down('md')]: {
			columnCount: 2
		},
		[theme.breakpoints.down('sm')]: {
			columnCount: 1
		}
	},
	sTimesListItem: {
		display: 'inline-block',
		marginBottom: theme.spacing(1),
		width: '100%'
	},
	sTimeLabel: {
		width: theme.typography.pxToRem(80)
	},
	sFormControl: {
		marginTop: theme.spacing(1)
	}
}));
