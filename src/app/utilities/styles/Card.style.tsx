import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const CardStyle = makeStyles((theme: Theme) => ({
	sCardContent0: {
		padding: 0,
		'&:last-child': {
			paddingBottom: 0
		}
	},
	sCardContent1: {
		padding: theme.typography.pxToRem(10),
		'&:last-child': {
			paddingBottom: theme.typography.pxToRem(10)
		}
	}
}));
