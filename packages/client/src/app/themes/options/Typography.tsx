import { TypographyOptions } from '@material-ui/core/styles/createTypography';

import { pxToRem } from '../../utilities/methods/PixelsToRem';

const TypographyCustom: TypographyOptions = {
	h1: {
		fontSize: pxToRem(28)
	},
	h2: {
		fontSize: pxToRem(26)
	},
	h3: {
		fontSize: pxToRem(24)
	},
	h4: {
		fontSize: pxToRem(22)
	},
	h5: {
		fontSize: pxToRem(20)
	},
	h6: {
		fontSize: pxToRem(18)
	}
};
export default TypographyCustom;
