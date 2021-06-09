import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../services';

export const SiteRoomsBlacklistStyles = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sCardContent: {
		padding: theme.spacing(1)
	},
	sAvailable: {
		backgroundColor: AppConfigService.AppOptions.colors.c10v1,
		color: AppConfigService.AppOptions.colors.c7
	}
}));
