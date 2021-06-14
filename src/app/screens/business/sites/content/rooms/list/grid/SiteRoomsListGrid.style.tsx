import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../../services';

export const SiteRoomsListGridStyles = makeStyles((theme: Theme) => ({
	sFloorLabel: {
		marginBottom: theme.spacing(1)
	},
	sGridContainer: {
		marginBottom: theme.spacing(3)
	},
	sCardContent: {
		position: 'relative'
	},
	sActive: {
		backgroundColor: AppConfigService.AppOptions.colors.c10v1,
		color: AppConfigService.AppOptions.colors.c7
	},
	sInactive: {
		backgroundColor: AppConfigService.AppOptions.colors.c12
	},
	sToggle: {
		alignItems: 'center',
		display: 'flex',
		height: '100%',
		position: 'absolute',
		right: theme.spacing(1.25),
		top: 0
	},
	sToggleCheckbox: {
		color: AppConfigService.AppOptions.colors.c15
	}
}));
