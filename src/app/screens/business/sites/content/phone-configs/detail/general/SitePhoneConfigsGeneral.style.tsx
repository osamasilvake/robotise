import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SitePhoneConfigsGeneralStyle = makeStyles((theme: Theme) => ({
	sGeneral: {
		position: 'relative'
	},
	sWorkflowInfoIcon: {
		cursor: 'help'
	},
	sEdit: {
		position: 'absolute',
		right: theme.typography.pxToRem(-10),
		top: theme.typography.pxToRem(-10)
	}
}));
