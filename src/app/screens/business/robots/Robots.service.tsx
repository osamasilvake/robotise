import { AppConfigService, HttpClientService } from '../../../services';
import { RobotDetailCameraTypeEnum } from './content/detail/cameras/RobotDetailCameras.enum';
import { DialogCreateOrderPayloadInterface } from './content/orders/list/actions/RobotOrdersActions.interface';

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
	robotTwinsSingleFetch = (robotId: string) => {
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
	 * @param activeOrders
	 * @returns
	 */
	robotOrdersFetch = (
		robotId: string,
		pageNo: number,
		rowsPerPage: number,
		activeOrders: boolean
	) => {
		const url = AppConfigService.AppServices.ROBOT.ORDERS;
		return HttpClientService.get(url, {
			params: {
				'filter[robot]': robotId,
				'filter[active]': activeOrders || undefined,
				'page[number]': pageNo,
				'page[size]': rowsPerPage
			}
		});
	};

	/**
	 * create an order
	 * @param payload
	 * @param siteId
	 * @returns
	 */
	robotOrderCreate = (payload: DialogCreateOrderPayloadInterface, siteId: string) => {
		const url = AppConfigService.AppServices.ROBOT.ORDERS;
		return HttpClientService.post(url, {
			data: {
				type: 'orders',
				attributes: payload,
				relationships: {
					site: {
						data: {
							type: 'sites',
							id: siteId
						}
					}
				}
			}
		});
	};

	/**
	 * cancel an order
	 * @param ids
	 * @param siteId
	 * @returns
	 */
	robotOrderCancel = (ids: string[], siteId: string) => {
		const url = AppConfigService.AppServices.ROBOT.ORDERS;
		return HttpClientService.patch(url, {
			data: ids.map((id) => {
				return {
					id,
					type: 'orders',
					attributes: {
						status: 'cancelRequest'
					},
					relationships: {
						site: {
							data: {
								type: 'sites',
								id: siteId
							}
						}
					}
				};
			})
		});
	};

	/**
	 * fetch robot order
	 * @param orderId
	 * @returns
	 */
	robotOrderFetch = (orderId: string) => {
		const url = AppConfigService.AppServices.ROBOT.ORDER.replace(':order', orderId);
		return HttpClientService.get(url);
	};

	/**
	 * fetch robot purchases
	 * @param robotId
	 * @param pageNo
	 * @param rowsPerPage
	 * @param billed
	 * @returns
	 */
	robotPurchasesFetch = (
		robotId: string,
		pageNo: number,
		rowsPerPage: number,
		billed: boolean
	) => {
		const url = AppConfigService.AppServices.ROBOT.PURCHASES;
		return HttpClientService.get(url, {
			params: {
				'filter[robot]': robotId,
				'filter[isBilled]': billed || undefined,
				'page[number]': pageNo,
				'page[size]': rowsPerPage
			}
		});
	};
}
const instance = new RobotsService();
export default instance;
