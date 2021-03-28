import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AuthUserDetailInterface } from '../../screens/authentication/Auth.interface';

export interface AuthSliceInterface {
	loader: boolean;
	loading: boolean;
	user: AuthUserDetailInterface | null;
	errors: TriggerMessageInterface | null;
}
