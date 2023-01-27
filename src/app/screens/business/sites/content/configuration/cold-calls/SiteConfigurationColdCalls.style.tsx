import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SiteConfigurationColdCallsStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3),
		position: 'relative'
	},
	sEnabled: {
		position: 'absolute',
		right: theme.spacing(1),
		top: 0
	},
	sLocations: {
		marginBottom: theme.spacing(2),
		maxWidth: theme.typography.pxToRem(400)
	},
	sTimes: {
		marginTop: theme.spacing(2)
	},
	sFormControl: {
		marginTop: theme.spacing(1)
	}
}));
