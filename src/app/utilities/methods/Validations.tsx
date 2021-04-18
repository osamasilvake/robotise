/**
 * validate email address
 * @param email
 * @returns
 */
export const validateEmail = (email: string): boolean => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email.toLowerCase());
};
