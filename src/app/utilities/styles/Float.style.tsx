import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../services';

export const FloatStyle = makeStyles((theme: Theme) => ({
	sFloat1: {
		borderLeft: `${theme.typography.pxToRem(5)} solid ${AppConfigService.AppOptions.colors.c9}`,
		padding: theme.spacing(2),
		position: 'fixed',
		right: -245,
		transition: '0.5s all',
		width: theme.typography.pxToRem(250),
		zIndex: AppConfigService.AppOptions.styles.zIndex.level3,
		'&:hover': {
			right: theme.typography.pxToRem(0)
		}
	}
}));
