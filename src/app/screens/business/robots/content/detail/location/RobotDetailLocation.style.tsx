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
	sCardRobotIcon: {
		bottom: 0,
		fill: AppConfigService.AppOptions.colors.c12,
		left: 0,
		position: 'absolute',
		transition: 'bottom 1s, left 1s, transform 0.2s',
		width: theme.typography.pxToRem(16)
	},
	sCardHumanTooltip: {
		cursor: 'help'
	},
	sCardHumanIcon: {
		bottom: 0,
		height: theme.typography.pxToRem(8),
		left: 0,
		position: 'absolute',
		width: theme.typography.pxToRem(8)
	},
	sCardPlannedPath: {
		bottom: 0,
		height: '100%',
		left: 0,
		position: 'absolute',
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
