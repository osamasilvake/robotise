import { AuthUserRoleTypeEnum } from '../../screens/authentication/Auth.enum';
import AuthService from '../../screens/authentication/Auth.service';
import { StorageTypeEnum } from '../../services/storage/Storage.enum';

describe('Authentication', () => {
	let accessToken: string;

	beforeEach(() => {
		accessToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MTI3NDIzNjcsImlhdCI6MTYxMjczMjA2NywianRpIjoiZGQxNGQyZGItMTZkZi00MGNlLTg4NWEtZjk0YjBlNDBlN2Q1IiwiaXNzIjoiaHR0cDovL2F1dGgucm9ib3Rpc2UuZXUvcmVhbG1zL3JvYy1zdGFnaW5nIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjMzZWY2NDMzLWY0MWUtNDE1Ny1hODhmLTI5OTI1ZTYzMTllYiIsInR5cCI6IkJlYXJlciIsImF6cCI6InJvYy1vcHMtYXBwIiwic2Vzc2lvbl9zdGF0ZSI6IjA4NGI2YTBkLTUzNDQtNGVkMi05NzQ1LTkwNWM0ZTY5ZjAzYyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJyb2Nfb3AiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3JkZXJzOnJlYWQgcm9ib3RzOndyaXRlIHJvYm90czpyZWFkIGVtYWlsIG9yZGVyczp3cml0ZSBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInVzZXJfaWQiOiIzM2VmNjQzMy1mNDFlLTQxNTctYTg4Zi0yOTkyNWU2MzE5ZWIiLCJuYW1lIjoiSW1yYW4gS2hhbiIsInByZWZlcnJlZF91c2VybmFtZSI6ImltcmFuLmtoYW5Acm9ib3Rpc2UuZXUiLCJnaXZlbl9uYW1lIjoiSW1yYW4iLCJmYW1pbHlfbmFtZSI6IktoYW4iLCJlbWFpbCI6ImltcmFuLmtoYW5Acm9ib3Rpc2UuZXUifQ.4Oqb3SCdDrWgQf4iHCuOHKbW4CT47jvpOBmdOYpFbOk';
		AuthService.setAccessToken(accessToken, StorageTypeEnum.SESSION);
	});

	afterEach(() => {
		AuthService.removeAccessToken();
	});

	test('Set and validate access_token', () => {
		expect(AuthService.getAccessToken()).toBe(accessToken);
	});

	test('Access token must be valid', () => {
		AuthService.setAccessToken(accessToken, StorageTypeEnum.PERSISTENT);
		expect(AuthService.authTokenValid(accessToken)).toBeTruthy();
	});

	test('Access token payload must have exp date', () => {
		const response = AuthService.authUserDetail(accessToken);
		expect(Boolean(response.exp)).toBe(true);
	});

	test('Access token payload must have role as ADMIN', () => {
		const response = AuthService.authUserDetail(accessToken);
		expect(response.data.role).toBe(AuthUserRoleTypeEnum.ADMIN);
	});
});
