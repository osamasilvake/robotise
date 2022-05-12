import { AppConfigService, HttpClientService } from '../../../services';
import { SRPContentInterface } from '../../../slices/setup/robot-password/RobotPassword.interface';
import {
	SetupRobotPasswordAxiosGetInterface,
	SetupRobotPasswordAxiosPostResponseInterface
} from './Setup.interface';

class SetupService {
	/**
	 * fetch robot password
	 * @returns
	 */
	setupRobotPassword = () => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.SETUP.ROBOT_PASSWORD;
		return HttpClientService.get<SetupRobotPasswordAxiosGetInterface>(url);
	};

	/**
	 * update robot password
	 * @param password
	 */
	setupUpdatePassword = (password: string) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.SETUP.ROBOT_PASSWORD;
		return HttpClientService.patch<
			SRPContentInterface,
			SetupRobotPasswordAxiosPostResponseInterface
		>(url, {
			data: {
				type: 'robots-passwords',
				attributes: { password }
			}
		});
	};
}
const instance = new SetupService();
export default instance;
