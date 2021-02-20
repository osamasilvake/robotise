import { AppVariables } from '../../../../app.config';
import { pxToRem } from '../../methods/PixelsToRem';

// Button 1
const Button1 = {
	backgroundColor: AppVariables.colors.c3,
	border: 'none',
	borderRadius: 2,
	color: AppVariables.colors.c2,
	fontSize: pxToRem(20),
	padding: '2px 12px'
};

// Button 2
const Button2 = {
	backgroundColor: AppVariables.colors.c3,
	border: `1px solid ${AppVariables.colors.c3}`,
	borderRadius: 2,
	color: AppVariables.colors.c2,
	fontSize: pxToRem(20),
	padding: '2px 12px'
};

export { Button1, Button2 };
