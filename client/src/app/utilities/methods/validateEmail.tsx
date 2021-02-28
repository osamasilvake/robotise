/**
 * validate email address
 * @param email
 */
export const validateEmail = (email: string) => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email.toLowerCase());
};
