/**
 * decode JWT token
 * @param token
 * @returns
 */
export const jwtDecode = (token: string) => {
	const base64 = token.split('.')[1];
	const payload = window.atob(base64);
	return JSON.parse(payload);
};
