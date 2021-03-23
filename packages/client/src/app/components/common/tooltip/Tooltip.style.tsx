import { makeStyles, Theme } from '@material-ui/core';

export const TooltipStyles = makeStyles((theme: Theme) => ({
	sTooltip: {
		padding: theme.spacing(0),
		textAlign: 'center'
	},
	sTooltipElementHideOnMobile: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	sTooltipElementCursorZoom: {
		cursor: 'zoom-in'
	},
	sTooltipElementCursorDefault: {
		cursor: 'default'
	}
}));
