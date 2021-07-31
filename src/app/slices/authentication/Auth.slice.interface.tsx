import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AuthUserDetailInterface } from '../../screens/authentication/Auth.interface';

export interface SliceAuthInterface {
	loader: boolean;
	loading: boolean;
	user: AuthUserDetailInterface | null;
	errors: TriggerMessageInterface | null;
}
