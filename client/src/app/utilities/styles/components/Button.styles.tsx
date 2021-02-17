import { pxToRem } from '../../methods/pxToRem';

// Button 1
const Button1 = {
	backgroundColor: 'var(--c3)',
	border: 'none',
	borderRadius: 2,
	color: 'var(--c2)',
	fontSize: pxToRem(20),
	padding: '2px 12px'
};

// Button 2
const Button2 = {
	backgroundColor: 'var(--c3)',
	border: '1px solid var(--c3)',
	borderRadius: 2,
	color: 'var(--c2)',
	fontSize: pxToRem(20),
	padding: '2px 12px'
};

export { Button1, Button2 };
