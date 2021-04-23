import { makeStyles, Theme } from '@material-ui/core';

export const TooltipStyles = makeStyles((theme: Theme) => ({
	sTooltip: {
		padding: 0,
		textAlign: 'left'
	},
	sTooltipElementHideOnMobile: {
		[theme.breakpoints.down('sm')]: {
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
