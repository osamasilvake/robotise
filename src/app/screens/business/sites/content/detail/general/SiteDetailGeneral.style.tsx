import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const SiteDetailGeneralStyle = makeStyles((theme: Theme) => ({
	sGeneralItemBlock: {
		display: 'block'
	},
	sGeneralLastItem: {
		textAlign: 'right',
		[theme.breakpoints.down('lg')]: {
			textAlign: 'left'
		}
	}
}));
