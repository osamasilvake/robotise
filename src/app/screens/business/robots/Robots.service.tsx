import { AppConfigService, HttpClientService } from '../../../services';
import { RCContentInterface } from '../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';
import { SROContentElevatorTemplateInterface } from '../../../slices/business/robots/RobotOperations.slice.interface';
import { RobotCommandsLogListPayloadInterface } from './content/commands-log/list/RobotCommandsLogList.interface';
import { RobotConfigFormInterface } from './content/configuration/cloud/robot-config/RobotConfig.interface';
import { RobotSiteConfigFormInterface } from './content/configuration/cloud/robot-site-config/RobotSiteConfig.interface';
import { RobotConfigurationRobotFormInterface } from './content/configuration/robot/RobotConfigurationRobot.interface';
import { RobotDetailCameraTypeEnum } from './content/detail/cameras/RobotDetailCameras.enum';
import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from './content/detail/commands/RobotDetailCommands.enum';
import { RobotDetailCommandsStateOptionInterface } from './content/detail/commands/RobotDetailCommands.interface';
import { NoteFormInterface } from './content/detail/general/RobotDetailGeneral.interface';
import { RobotElevatorCallsListPayloadInterface } from './content/elevator-calls/list/RobotElevatorCallsList.interface';
import { DialogCreateOrderFormInterface } from './content/orders/list/actions/RobotOrdersActions.interface';
import { RobotOrdersListPayloadInterface } from './content/orders/list/RobotOrdersList.interface';
import { RobotPurchasesListPayloadInterface } from './content/purchases/list/RobotPurchasesList.interface';
import { DialogCreateRobotFormInterface } from './list/actions/RobotsActions.interface';
import {
	RobotCommandLogsAxiosGetInterface,
	RobotCreateAxiosPostRequestInterface,
	RobotCreateAxiosPostResponseInterface,
	RobotElevatorCallsAxiosGetInterface,
	RobotInventoryAxiosGetInterface,
	RobotMapAxiosGetInterface,
	RobotOrderAxiosGetInterface,
	RobotOrderCancelAxiosPatchRequestInterface,
	RobotOrderCancelAxiosPatchResponseInterface,
	RobotOrderCreateAxiosPostRequestInterface,
	RobotOrderCreateAxiosPostResponseInterface,
	RobotOrdersAxiosGetInterface,
	RobotPurchaseAxiosGetInterface,
	RobotPurchasesAxiosGetInterface,
	RobotTwinsAxiosGetInterface,
	RobotTwinSummaryAxiosGetInterface
} from './Robots.interface';

class RobotsService {
	/**
	 * fetch robot twins summary
	 * @returns
	 */
	robotTwinsSummaryFetch = () => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.SUMMARY;
		return HttpClientService.get<RobotTwinSummaryAxiosGetInterface>(url);
	};

	/**
	 * create a robot
	 * @param payload
	 * @returns
	 */
	robotCreate = (payload: DialogCreateRobotFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ALL;
		return HttpClientService.post<
			RobotCreateAxiosPostRequestInterface,
			RobotCreateAxiosPostResponseInterface
		>(url, {
			data: {
				type: 'robots',
				attributes: {
					name: payload.name,
					customerName: payload.customerName,
					configs: {
						isOnlineCheckDisabled: true,
						isHidden: true
					}
				},
				relationships: {
					site: {
						data: {
							type: 'sites',
							id: payload.siteId
						}
					}
				}
			}
		});
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
		return HttpClientService.get<RobotTwinsAxiosGetInterface>(url);
	};

	/**
	 * update note field
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotNoteUpdate = (robotId: string, payload: NoteFormInterface) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIGURATION.CONFIG.replace(
				':robotId',
				robotId
			);
		return HttpClientService.patch(url, {
			data: {
				type: 'robots',
				attributes: {
					note: payload.note
				}
			}
		});
	};

	/**
	 * fetch robot map
	 * @param mapId
	 * @returns
	 */
	robotMapFetch = (mapId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.MAP.replace(
			':mapId',
			mapId
		);
		return HttpClientService.get<RobotMapAxiosGetInterface>(url);
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
			':robotId',
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
	 * request robot camera command
	 * @param camera
	 * @param robotId
	 * @returns
	 */
	robotCameraCommandRequest = (camera: RobotDetailCameraTypeEnum, robotId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.COMMANDS.replace(
			':robotId',
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
			':robotId',
			robotId
		);
		return HttpClientService.get<RobotInventoryAxiosGetInterface>(url);
	};

	/**
	 * fetch robot orders
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotOrdersFetch = (robotId: string, payload: RobotOrdersListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS.FETCH;
		return HttpClientService.get<RobotOrdersAxiosGetInterface>(url, {
			params: {
				'filter[robot]': robotId,
				'filter[active]': payload.activeOrders || undefined,
				'filter[isDebug]': payload.debug ? undefined : false,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * create an order
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	robotOrderCreate = (siteId: string, payload: DialogCreateOrderFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS.FETCH;
		return HttpClientService.post<
			RobotOrderCreateAxiosPostRequestInterface,
			RobotOrderCreateAxiosPostResponseInterface
		>(url, {
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
	 * @param siteId
	 * @param ids
	 * @returns
	 */
	robotOrderCancel = (siteId: string, ids: string[]) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS.FETCH;
		return HttpClientService.patch<
			RobotOrderCancelAxiosPatchRequestInterface,
			RobotOrderCancelAxiosPatchResponseInterface
		>(url, {
			data: ids.map((id) => ({
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
			}))
		});
	};

	/**
	 * restart an order
	 * @param orderId
	 * @returns
	 */
	robotOrderRestart = (orderId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS.RESTART.replace(
			':orderId',
			orderId
		);
		return HttpClientService.put(url);
	};

	/**
	 * fetch robot order
	 * @param orderId
	 * @returns
	 */
	robotOrderFetch = (orderId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS.SINGLE.replace(
			':orderId',
			orderId
		);
		return HttpClientService.get<RobotOrderAxiosGetInterface>(url);
	};

	/**
	 * fetch robot purchases
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotPurchasesFetch = (robotId: string, payload: RobotPurchasesListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.PURCHASES.FETCH;
		return HttpClientService.get<RobotPurchasesAxiosGetInterface>(url, {
			params: {
				'filter[robot]': robotId,
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
	robotPurchaseCommentEdit = (purchaseId: string, comment: string) => {
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.PURCHASES.SINGLE.replace(
			':purchaseId',
			purchaseId
		);
		return HttpClientService.get<RobotPurchaseAxiosGetInterface>(url);
	};

	/**
	 * fetch robot commands log
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotCommandsLogFetch = (robotId: string, payload: RobotCommandsLogListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.COMMANDS_LOGS;
		return HttpClientService.get<RobotCommandLogsAxiosGetInterface>(url, {
			params: {
				'filter[robot]': robotId,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * fetch robot elevator calls
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotElevatorCallsFetch = (
		robotId: string,
		payload: RobotElevatorCallsListPayloadInterface
	) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ELEVATOR_CALLS;
		return HttpClientService.get<RobotElevatorCallsAxiosGetInterface>(url, {
			params: {
				'filter[robot]': robotId,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * test elevator call
	 * @param siteId
	 * @returns
	 */
	robotElevatorCallsTest = (siteId: string) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ELEVATOR_CALLS_TEST.replace(
				':siteId',
				siteId
			);
		return HttpClientService.get(url);
	};

	/**
	 * fetch elevator template
	 * @param elevatorId
	 * @returns
	 */
	robotElevatorTemplateFetch = (elevatorId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ELEVATOR_CALL_TEMPLATE;
		return HttpClientService.get<SROContentElevatorTemplateInterface>(
			url.replace(':elevatorId', elevatorId)
		);
	};

	/**
	 * set emergency state
	 * @param robotId
	 * @param isInEmergencyState
	 * @returns
	 */
	robotSetEmergencyState = (robotId: string, isInEmergencyState: boolean) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.COMMANDS.replace(
			':robotId',
			robotId
		);
		return HttpClientService.post(url, {
			data: {
				type: 'robot-commands',
				attributes: {
					command: 'set-emergency-state',
					options: {
						active: isInEmergencyState
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
	robotProductsSync = (robotId: string) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIGURATION.SYNC_PRODUCTS.replace(
				':robotId',
				robotId
			);
		return HttpClientService.post(url);
	};

	/**
	 * update robot config
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotConfigUpdate = (robotId: string, payload: RobotConfigFormInterface) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIGURATION.CONFIG.replace(
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
						ceInventoryId: payload.ceInventoryId,
						ca: (payload.username || payload.ipAddress) && {
							username: payload.username,
							ip: payload.ipAddress
						},
						isHidden: payload.isHidden,
						isOnlineCheckDisabled: payload.isOnlineCheckDisabled
					}
				}
			}
		});
	};

	/**
	 * update robot site config
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotSiteConfigUpdate = (robotId: string, payload: RobotSiteConfigFormInterface) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIGURATION.CONFIG.replace(
				':robotId',
				robotId
			);
		return HttpClientService.patch(url, {
			data: {
				type: 'robots',
				id: robotId,
				relationships: {
					site: {
						data: {
							type: 'sites',
							id: payload.siteId
						}
					}
				}
			}
		});
	};

	/**
	 * fetch robot configuration
	 * @param robotId
	 * @returns
	 */
	robotConfigurationFetch = (robotId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIGURATION.CONFIGS;
		return HttpClientService.get<RCContentInterface>(url.replace(':robotId', robotId));
	};

	/**
	 * update robot configuration
	 * @param robotId
	 * @param configId
	 * @param payload
	 * @returns
	 */
	robotConfigurationUpdate = (
		robotId: string,
		configId: string,
		payload: RobotConfigurationRobotFormInterface
	) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIGURATION.CONFIGS_SINGLE;
		return HttpClientService.patch(
			url.replace(':robotId', robotId).replace(':configId', configId),
			{
				data: {
					type: 'robotConfigs',
					id: configId,
					attributes: payload.request,
					relationships: {
						robot: {
							data: {
								type: 'robots',
								id: robotId
							}
						}
					}
				}
			}
		);
	};
}
const instance = new RobotsService();
export default instance;
