import { AuthUserDetailInterface } from '../../screens/authentication/Auth.interface';

/**
 * auth slice
 */
export interface AuthInterface {
	loading: boolean;
	response: AuthUserDetailInterface | null;
	errors: ErrorInterface | null;
}

/**
 * error payload
 */
export interface ErrorInterface {
	status: string;
	msg: string;
}
