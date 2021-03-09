/**
 * generate random number between min and max included
 * @param min
 * @param max
 */
export const randomNum = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
