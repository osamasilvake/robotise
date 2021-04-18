import { AppConfigService, HttpClientService } from '../../../services';
import { RobotDetailCameraTypeEnum } from './content/detail/cameras/RobotDetailCameras.enum';

class RobotsService {
	/**
	 * fetch robot twins summary
	 * @returns
	 */
	robotTwinsSummaryFetch = () => {
		const url = AppConfigService.AppServices.ROBOT_TWINS.SUMMARY;
		return HttpClientService.get(url);
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
		const url = AppConfigService.AppServices.ROBOT_TWINS.SINGLE.replace(
			':robotTwinId',
			robotId
		);
		return HttpClientService.get(url);
	};

	/**
	 * fetch robot map location
	 * @param mapId
	 * @returns
	 */
	robotLocationMapFetch = (mapId: string) => {
		const url = AppConfigService.AppServices.ROBOT.MAPS.replace(':mapId', mapId);
		return HttpClientService.get(url);
	};

	/**
	 * request robot camera image
	 * @param camera
	 * @param robotId
	 * @returns
	 */
	robotRequestCameraImage = (camera: RobotDetailCameraTypeEnum, robotId: string) => {
		const url = AppConfigService.AppServices.ROBOT.COMMANDS.replace(':robot', robotId);
		return HttpClientService.post(url, {
			data: {
				type: 'robot-commands',
				attributes: {
					options: { camera },
					command: 'catch-camera-image'
				}
			}
		});
	};

	/**
	 * fetch robot inventory
	 * @param robotId
	 */
	robotInventoryFetch = (robotId: string) => {
		const url = AppConfigService.AppServices.ROBOT.INVENTORY.replace(':robot', robotId);
		return HttpClientService.get(url);
	};

	/**
	 * fetch robot orders
	 * @param robotId
	 * @param pageNo
	 * @param rowsPerPage
	 * @returns
	 */
	robotOrdersFetch = (robotId: string, pageNo: number, rowsPerPage: number) => {
		const url = AppConfigService.AppServices.ROBOT.ORDERS;
		const apiLink = !pageNo ? url : `${url}?page[number]=${pageNo}&page[size]=${rowsPerPage}`;
		return HttpClientService.get(apiLink, {
			params: {
				'filter[robot]': robotId
			}
		});
	};
}
const instance = new RobotsService();
export default instance;
