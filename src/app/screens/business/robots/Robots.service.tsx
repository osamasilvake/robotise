import { AppConfigService, HttpClientService } from '../../../services';
import { RobotConfigPayloadInterface } from './content/configuration/robot-config/RobotConfig.interface';
import { RobotDetailCameraTypeEnum } from './content/detail/cameras/RobotDetailCameras.enum';
import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from './content/detail/commands/RobotDetailCommands.enum';
import { RobotDetailCommandsStateOptionInterface } from './content/detail/commands/RobotDetailCommands.interface';
import { DialogCreateOrderPayloadInterface } from './content/orders/list/actions/RobotOrdersActions.interface';
import { RobotOrdersListPayloadInterface } from './content/orders/list/RobotOrdersList.interface';
import { RobotPurchasesListPayloadInterface } from './content/purchases/RobotPurchasesList.interface';

class RobotsService {
	/**
	 * fetch robot twins summary
	 * @returns
	 */
	robotTwinsSummaryFetch = () => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ALL;
		return HttpClientService.get(url);
	};

	/**
	 * fetch robot twin
	 * @param robotTwinId
	 * @returns
	 */
	robotTwinFetch = (robotTwinId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.SINGLE.replace(
			':robotTwinId',
			robotTwinId
		);
		return HttpClientService.get(url);
	};

	/**
	 * send robot control command
	 * @param robotId
	 * @param command
	 * @param option
	 * @returns
	 */
	robotControlCommandSend = (
		robotId: string,
		command: RobotDetailCommandsTypeEnum,
		option?:
			| RobotDetailControlModeTypeEnum
			| RobotDetailCommandsMuteSensorsTypeEnum
			| string
			| number
	) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.COMMANDS.replace(
			':robot',
			robotId
		);

		const options: RobotDetailCommandsStateOptionInterface = {};
		switch (command) {
			case RobotDetailCommandsTypeEnum.TRANSLATE:
				options.distance = option;
				break;
			case RobotDetailCommandsTypeEnum.ROTATE:
				options.angle = option;
				break;
			case RobotDetailCommandsTypeEnum.MUTE_SENSORS:
				options.state = option;
				break;
			case RobotDetailCommandsTypeEnum.CONTROL_MODE:
			default:
				options.mode = option;
		}

		return HttpClientService.post(url, {
			data: {
				type: 'robot-commands',
				attributes: {
					command,
					options
				}
			}
		});
	};

	/**
	 * fetch robot map location
	 * @param mapId
	 * @returns
	 */
	robotLocationMapFetch = (mapId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.MAPS.replace(
			':mapId',
			mapId
		);
		return HttpClientService.get(url);
	};

	/**
	 * request robot camera image
	 * @param camera
	 * @param robotId
	 * @returns
	 */
	robotRequestCameraImage = (camera: RobotDetailCameraTypeEnum, robotId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.COMMANDS.replace(
			':robot',
			robotId
		);
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.INVENTORY.replace(
			':robot',
			robotId
		);
		return HttpClientService.get(url);
	};

	/**
	 * fetch robot orders
	 * @param payload
	 * @returns
	 */
	robotOrdersFetch = (payload: RobotOrdersListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS;
		return HttpClientService.get(url, {
			params: {
				'filter[robot]': payload.robotId,
				'filter[active]': payload.activeOrders || undefined,
				'filter[isDebug]': payload.debug ? undefined : false,
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS;
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS;
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDER.replace(
			':order',
			orderId
		);
		return HttpClientService.get(url);
	};

	/**
	 * fetch robot purchases
	 * @param payload
	 * @returns
	 */
	robotPurchasesFetch = (payload: RobotPurchasesListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.PURCHASES;
		return HttpClientService.get(url, {
			params: {
				'filter[robot]': payload.robotId,
				'filter[isBilled]': payload.billed ? false : undefined,
				'filter[isDebug]': payload.debug ? undefined : false,
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.PURCHASES;
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.PURCHASE.replace(
			':purchase',
			purchaseId
		);
		return HttpClientService.get(url);
	};

	/**
	 * update robot specific detail
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotConfig = (robotId: string, payload: RobotConfigPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ROBOT_CONFIG.replace(
			':robotId',
			robotId
		);
		return HttpClientService.patch(url, {
			data: {
				type: 'robots',
				attributes: {
					name: payload.name,
					customerName: payload.customerName,
					configs: {
						isHidden: payload.isHidden,
						isOnlineCheckDisabled: false
					}
				}
			}
		});
	};

	/**
	 * sync products on the robot
	 * @param robotId
	 * @returns
	 */
	robotSyncProducts = (robotId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.SYNC_PRODUCTS.replace(
			':robot',
			robotId
		);
		return HttpClientService.post(url);
	};
}
const instance = new RobotsService();
export default instance;
