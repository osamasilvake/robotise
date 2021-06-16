import { makeStyles, Theme } from '@material-ui/core/styles';

export const TooltipStyle = makeStyles((theme: Theme) => ({
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
