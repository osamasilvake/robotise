import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../services';

export const ReportStyle = makeStyles((theme: Theme) => ({
	sDownloadLink: {
		color: AppConfigService.AppOptions.colors.c9,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline'
		}
	},
	sDownloadIcon: {
		marginRight: theme.spacing(0.7)
	}
}));
