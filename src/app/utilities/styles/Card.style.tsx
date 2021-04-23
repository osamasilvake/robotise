import { makeStyles, Theme } from '@material-ui/core/styles';

export const CardStyles = makeStyles((theme: Theme) => ({
	sCardContent1: {
		padding: theme.typography.pxToRem(15),
		'&:last-child': {
			paddingBottom: theme.typography.pxToRem(15)
		}
	},
	sCardContent2: {
		padding: theme.typography.pxToRem(10),
		'&:last-child': {
			paddingBottom: theme.typography.pxToRem(10)
		}
	},
	sCardContent3: {
		padding: theme.typography.pxToRem(5),
		'&:last-child': {
			paddingBottom: theme.typography.pxToRem(5)
		}
	}
}));
