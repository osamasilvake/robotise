import { TriggerMessageEnum } from '../../frame/message/Message.interface';
import { AuthUserDetailInterface } from '../../screens/authentication/Auth.interface';

// auth slice
export interface AuthSliceInterface {
	loading: boolean;
	user: AuthUserDetailInterface | null;
	errors: ErrorInterface | null;
}

// error payload
export interface ErrorInterface {
	severity: TriggerMessageEnum;
	text: string;
}
