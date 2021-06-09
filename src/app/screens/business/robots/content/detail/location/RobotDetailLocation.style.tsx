import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailLocationStyles = makeStyles((theme: Theme) => ({
	sLocationContainer: {
		marginTop: theme.spacing(4)
	},
	sLocationTitle: {
		marginBottom: theme.spacing(1)
	},
	sLocationCard: {
		marginTop: theme.spacing(1),
		position: 'relative'
	},
	sLocationCardGridLines: {
		'&::before': {
			backgroundImage:
				'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAHlBMVEUAAABkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGSH0mEbAAAACnRSTlMAzDPDPPPYnGMw2CgMzQAAAChJREFUKM9jgAPOAgZMwGIwKkhXQSUY0BCCMxkEYUAsEM4cjI4fwYIAf2QMNbUsZjcAAAAASUVORK5CYII=)',
			backgroundSize: theme.typography.pxToRem(20),
			content: '""',
			height: '100%',
			position: 'absolute',
			width: '100%'
		}
	},
	sLocationCardIcon: {
		fill: AppConfigService.AppOptions.colors.c12,
		left: 0,
		position: 'absolute',
		right: 0,
		transition: 'top 1s ease 0s',
		transitionProperty: 'left, bottom',
		width: theme.typography.pxToRem(16)
	},
	sLocationInfoLabel: {
		display: 'inline-block',
		fontWeight: 500,
		width: theme.typography.pxToRem(70),
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing(0.65)
		}
	},
	sLocationInfoValue: {
		display: 'inline-block'
	},
	sLocationInfoCheckbox: {
		marginLeft: theme.spacing(-1.25)
	}
}));
