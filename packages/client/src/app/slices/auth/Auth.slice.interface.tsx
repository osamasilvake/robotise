import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AuthUserDetailInterface } from '../../screens/authentication/Auth.interface';

export interface AuthSliceInterface {
	loading: boolean;
	user: AuthUserDetailInterface | null;
	errors: TriggerMessageInterface | null;
}
