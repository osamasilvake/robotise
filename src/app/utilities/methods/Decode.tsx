/**
 * decode JWT token
 * @param token
 * @returns
 */
export const jwtDecode = (token: string) => {
	const base64Payload = token.split('.')[1];
	const payload = Buffer.from(base64Payload, 'base64');
	return JSON.parse(payload.toString());
};
