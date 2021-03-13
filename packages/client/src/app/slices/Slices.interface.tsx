import { AuthSliceInterface } from './auth/Auth.slice.interface';
import { GeneralSliceInterface } from './general/General.slice.interface';
import { RobotTwinsSliceInterface } from './robot-twins/RobotTwins.slice.interface';
import { RobotsSliceInterface } from './robots/Robots.slice.interface';
import { SitesSliceInterface } from './sites/Sites.slice.interface';

export interface RootStateInterface {
	auth: AuthSliceInterface;
	general: GeneralSliceInterface;
	sites: SitesSliceInterface;
	robotTwins: RobotTwinsSliceInterface;
	robots: RobotsSliceInterface;
}
