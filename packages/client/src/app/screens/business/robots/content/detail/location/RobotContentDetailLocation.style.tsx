import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../../../services';

export const RobotContentDetailLocationStyles = makeStyles((theme: Theme) => ({
	sLocationContainer: {
		marginTop: theme.spacing(4)
	},
	sLocationTitle: {
		marginTop: theme.spacing(1)
	},
	sLocationCard: {
		marginTop: theme.spacing(1),
		position: 'relative'
	},
	sLocationCardIcon: {
		bottom: 0,
		fill: AppConfigService.AppVariables.colors.c12,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		transition: 'top 1s ease 0s',
		transitionProperty: 'left, top',
		width: theme.typography.pxToRem(14)
	},
	sLocationInfoLabel: {
		display: 'inline-block',
		fontWeight: 500,
		textDecoration: 'uppercase',
		width: theme.typography.pxToRem(50)
	},
	sLocationInfoValue: {
		display: 'inline-block'
	}
}));
