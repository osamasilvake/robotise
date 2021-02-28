import { AuthUserDetailInterface } from '../../screens/authentication/Auth.interface';

// auth slice
export interface AuthSliceInterface {
	loading: boolean;
	response: AuthUserDetailInterface | null;
	errors: ErrorInterface | null;
}

// error payload
export interface ErrorInterface {
	status: string;
	msg: string;
}
