import { AuthSliceInterface } from './auth/Auth.interface';
import { GeneralSliceInterface } from './general/General.interface';

export interface RootStateInterface {
	auth: AuthSliceInterface;
	general: GeneralSliceInterface;
}
