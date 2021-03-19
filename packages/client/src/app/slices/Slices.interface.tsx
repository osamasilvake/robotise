import { AuthSliceInterface } from './auth/Auth.slice.interface';
import { GeneralSliceInterface } from './general/General.slice.interface';
import { RTSSInterface } from './robot-twins/RobotTwinsSummary.slice.interface';
import { SSInterface } from './sites/Sites.slice.interface';

export interface RootStateInterface {
	auth: AuthSliceInterface;
	general: GeneralSliceInterface;
	robotTwinsSummary: RTSSInterface;
	sites: SSInterface;
}
