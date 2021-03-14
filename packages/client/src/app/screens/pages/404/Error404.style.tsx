import { makeStyles, Theme } from '@material-ui/core';

import { pxToRem } from '../../../utilities/methods/PixelsToRem';

export const error404Styles = makeStyles((theme: Theme) => ({
	sTitle: {
		fontSize: pxToRem(75)
	},
	sDescription: {
		fontSize: pxToRem(20),
		lineHeight: 1.2,
		margin: theme.spacing(0, 'auto', 1.5),
		maxWidth: 500
	},
	sLink: {
		fontSize: pxToRem(17)
	}
}));
