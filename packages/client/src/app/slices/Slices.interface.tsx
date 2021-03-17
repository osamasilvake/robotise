import { AuthSliceInterface } from './auth/Auth.slice.interface';
import { GeneralSliceInterface } from './general/General.slice.interface';
import { RTSInterface } from './robot-twins/RobotTwins.slice.interface';
import { RTSSInterface } from './robot-twins/RobotTwinsSummary.slice.interface';
import { SitesSliceInterface } from './sites/Sites.slice.interface';

export interface RootStateInterface {
	auth: AuthSliceInterface;
	general: GeneralSliceInterface;
	sites: SitesSliceInterface;
	robotTwins: RTSInterface;
	robots: RTSSInterface;
}
