/**
 * timeout the execution
 * @param delay
 */
export const timeout = (delay: number) => {
	return new Promise((res) => setTimeout(res, delay));
};
