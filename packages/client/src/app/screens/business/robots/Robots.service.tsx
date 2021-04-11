import { AppConfigService, HttpClientService } from '../../../services';
import { RobotContentDetailCameraTypeEnum } from './content/detail/cameras/RobotContentDetailCameras.enum';

class RobotsService {
	/**
	 * fetch robot twins summary
	 * @param pageNo
	 * @param rowsPerPage
	 * @returns
	 */
	robotTwinsSummaryFetch = (pageNo?: number, rowsPerPage?: number) => {
		const url = AppConfigService.AppServices.ROBOT_TWINS.SUMMARY;
		const apiLink = !pageNo ? url : `${url}?page[number]=${pageNo}&page[size]=${rowsPerPage}`;
		return HttpClientService.get(apiLink);
	};

	/**
	 * fetch robot twins
	 * @returns
	 */
	robotTwinsFetch = () => {
		const url = AppConfigService.AppServices.ROBOT_TWINS.ALL;
		return HttpClientService.get(url);
	};

	/**
	 * fetch robot twins of a single robot
	 * @param robotId
	 * @returns
	 */
	robotTwinsSingleRobotFetch = (robotId: string) => {
		const url = AppConfigService.AppServices.ROBOT_TWINS.ALL;
		return HttpClientService.get(`${url}/${robotId}`);
	};

	/**
	 * fetch robot map location
	 * @param mapId
	 * @returns
	 */
	robotLocationMapFetch = (mapId: string) => {
		const url = AppConfigService.AppServices.ROBOT.MAP;
		return HttpClientService.get(`${url}/${mapId}`);
	};

	/**
	 * request robot camera image
	 * @param camera
	 * @param robotId
	 * @returns
	 */
	robotRequestCameraImage = (camera: RobotContentDetailCameraTypeEnum, robotId: string) => {
		const url = AppConfigService.AppServices.ROBOT.ALL;
		return HttpClientService.post(`${url}/${robotId}/commands`, {
			data: {
				type: 'robot-commands',
				attributes: {
					options: { camera },
					command: 'catch-camera-image'
				}
			}
		});
	};
}
const instance = new RobotsService();
export default instance;
