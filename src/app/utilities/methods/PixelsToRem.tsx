/**
 * convert pixels to rem
 * @param size
 * @returns
 */
export const pxToRem = (size: number): string => {
	return (size / 16) * 1 + 'rem';
};
