import { AuthUserDetailInterface } from '../../screens/authentication/Auth.interface';
import { PushMessageTypeEnum } from '../general/General.enum';

// auth slice
export interface AuthSliceInterface {
	loading: boolean;
	response: AuthUserDetailInterface | null;
	errors: ErrorInterface | null;
}

// error payload
export interface ErrorInterface {
	severity: PushMessageTypeEnum;
	text: string;
}
