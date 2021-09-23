import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../services';

export const ReportStyle = makeStyles((theme: Theme) => ({
	sDownloadLink: {
		alignItems: 'center',
		color: AppConfigService.AppOptions.colors.c9,
		display: 'inline-flex',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline'
		}
	},
	sDownloadIcon: {
		marginRight: theme.spacing(0.7)
	}
}));
