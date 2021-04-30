import { AppConfigService, HttpClientService } from '../../../services';
import { RobotDetailCameraTypeEnum } from './content/detail/cameras/RobotDetailCameras.enum';
import { DialogCreateOrderPayloadInterface } from './content/orders/list/actions/RobotOrdersActions.interface';
import { RobotOrdersFetchListInterface } from './content/orders/RobotOrders.interface';
import { RobotPurchasesFetchListInterface } from './content/purchases/list/table/RobotPurchasesTable.interface';

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
	 * @param payload
	 * @returns
	 */
	robotOrdersFetch = (payload: RobotOrdersFetchListInterface) => {
		const url = AppConfigService.AppServices.ROBOT.ORDERS;
		return HttpClientService.get(url, {
			params: {
				'filter[robot]': payload.robotId,
				'filter[active]': payload.activeOrders ? false : undefined,
				'filter[isDebug]': payload.debug,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
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
	 * @param payload
	 * @returns
	 */
	robotPurchasesFetch = (payload: RobotPurchasesFetchListInterface) => {
		const url = AppConfigService.AppServices.ROBOT.PURCHASES;
		return HttpClientService.get(url, {
			params: {
				'filter[robot]': payload.robotId,
				'filter[isBilled]': payload.billed ? false : undefined,
				'filter[isDebug]': payload.debug,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * edit a comment field
	 * @param purchaseId
	 * @param comment
	 * @returns
	 */
	robotPurchaseEditComment = (purchaseId: string, comment: string) => {
		const url = AppConfigService.AppServices.ROBOT.PURCHASES;
		return HttpClientService.patch(`${url}/${purchaseId}`, {
			data: {
				type: 'orderReports',
				attributes: {
					comment: comment
				}
			}
		});
	};

	/**
	 * fetch robot purchase
	 * @param purchaseId
	 * @returns
	 */
	robotPurchaseFetch = (purchaseId: string) => {
		const url = AppConfigService.AppServices.ROBOT.PURCHASE.replace(':purchase', purchaseId);
		return HttpClientService.get(url);
	};
}
const instance = new RobotsService();
export default instance;
