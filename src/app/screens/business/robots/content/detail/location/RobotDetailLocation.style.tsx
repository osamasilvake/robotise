import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailLocationStyle = makeStyles((theme: Theme) => ({
	sContainer: {
		marginTop: theme.spacing(4)
	},
	sTitle: {
		marginBottom: theme.spacing(1)
	},
	sCard: {
		marginTop: theme.spacing(1),
		position: 'relative'
	},
	sCardGridLines: {
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
	sCardHumanTooltip: {
		cursor: 'help'
	},
	sCardRobotIcon: {
		fill: AppConfigService.AppOptions.colors.c12,
		position: 'absolute',
		transition: 'bottom 1s, left 1s, transform 0.2s',
		width: theme.typography.pxToRem(16)
	},
	sCardHumanIcon: {
		height: theme.typography.pxToRem(8),
		position: 'absolute',
		width: theme.typography.pxToRem(8)
	},
	sCardPlannedPath: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		width: '100%'
	},
	sInfoGridBox: {
		marginBottom: theme.spacing(-0.6)
	},
	sInfoLabel: {
		display: 'inline-block',
		fontWeight: 500,
		width: theme.typography.pxToRem(70),
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing(0.65)
		}
	},
	sInfoValue: {
		display: 'inline-block'
	},
	sInfoCheckbox: {
		marginLeft: theme.spacing(-1.5)
	}
}));
