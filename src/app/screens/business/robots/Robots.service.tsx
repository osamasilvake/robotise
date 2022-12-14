import { AppConfigService, HttpClientService } from '../../../services';
import {
	RCCDataElementInterface,
	RCContentInterface
} from '../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';
import { RobotCommandsLogListPayloadInterface } from './content/commands-log/list/RobotCommandsLogList.interface';
import { RobotConfigFormInterface } from './content/configuration/cloud/robot-config/RobotConfig.interface';
import { RobotConfigurationSyncConfigsTypeEnum } from './content/configuration/cloud/sync-configs/RobotConfigurationSyncConfigs.enum';
import { RobotDetailCameraTypeEnum } from './content/detail/cameras/RobotDetailCameras.enum';
import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from './content/detail/commands/RobotDetailCommands.enum';
import { RobotDetailCommandsStateOptionInterface } from './content/detail/commands/RobotDetailCommands.interface';
import { NoteFormInterface } from './content/detail/general/RobotDetailGeneral.interface';
import { RobotDetailRemoteSafetyResetOptionsInterface } from './content/detail/remote-safety-reset/RobotDetailRemoteSafetyReset.interface';
import { RobotElevatorCallsListPayloadInterface } from './content/elevator-calls/list/RobotElevatorCallsList.interface';
import { RobotElevatorCallsManualTestTypeEnum } from './content/elevator-calls/list/table/RobotElevatorCallsTable.enum';
import { DialogCreateOrderFormInterface } from './content/orders/list/actions/RobotOrdersActions.interface';
import { RobotOrdersListPayloadInterface } from './content/orders/list/RobotOrdersList.interface';
import { RobotPurchasesListPayloadInterface } from './content/purchases/list/RobotPurchasesList.interface';
import { DialogCreateRobotFormInterface } from './list/actions/RobotsActions.interface';
import {
	RobotCommandLogsAxiosGetInterface,
	RobotCreateAxiosPostRequestInterface,
	RobotCreateAxiosPostResponseInterface,
	RobotElevatorCallsAxiosGetInterface,
	RobotElevatorCallsTemplateAxiosGetInterface,
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
	 * send remote safety reset command
	 * @param robotId
	 * @param options
	 * @returns
	 */
	robotRemoteSafetyResetCommandSend = (
		robotId: string,
		options: RobotDetailRemoteSafetyResetOptionsInterface
	) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.COMMANDS.replace(
			':robotId',
			robotId
		);
		return HttpClientService.post(url, {
			data: {
				type: 'robot-commands',
				attributes: {
					command: 'remote-safety-reset',
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
				'filter[mode][nin]': payload.marketingRides ? undefined : 'marketing-ride',
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * create an order
	 * @param siteId
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotOrderCreate = (
		siteId: string,
		robotId: string,
		payload: DialogCreateOrderFormInterface
	) => {
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
					},
					robot: {
						data: {
							type: 'robots',
							id: robotId
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.PURCHASES.FETCH;
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ELEVATOR_CALLS.FETCH;
		return HttpClientService.get<RobotElevatorCallsAxiosGetInterface>(url, {
			params: {
				'filter[robot]': robotId,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * fetch elevator calls test
	 * @param siteId
	 * @returns
	 */
	robotElevatorCallsTestFetch = (siteId: string) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ELEVATOR_CALLS.TEST.replace(
				':siteId',
				siteId
			);
		return HttpClientService.get(url);
	};

	/**
	 * fetch elevator calls template
	 * @param elevatorId
	 * @returns
	 */
	robotElevatorCallsTemplateFetch = (elevatorId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ELEVATOR_CALLS.TEMPLATE;
		return HttpClientService.get<RobotElevatorCallsTemplateAxiosGetInterface>(
			url.replace(':elevatorId', elevatorId)
		);
	};

	/**
	 * test manual elevator call
	 * @param callType
	 * @param callId
	 * @param liftId
	 * @returns
	 */
	robotElevatorCallsManualTest = (
		callType: RobotElevatorCallsManualTestTypeEnum,
		callId: string,
		liftId = ''
	) => {
		const robots = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS;
		const { SEND_LIFT, ENTER_CAR, EXIT_CAR } = robots.ELEVATOR_CALLS.MANUAL_TEST;

		const types = RobotElevatorCallsManualTestTypeEnum;
		const urlSendLift = callType === types.SEND_LIFT;
		const urlEnterCar = callType === types.ENTER_CAR;
		const url = urlSendLift ? SEND_LIFT : urlEnterCar ? ENTER_CAR : EXIT_CAR;

		return HttpClientService.patch<unknown, null>(
			url.replace(':callId', callId).replace(':liftId', liftId),
			{},
			{ headers: AppConfigService.AppRequestHeaders.json }
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
	 * sync configs
	 * @param robotId
	 * @param type
	 * @returns
	 */
	robotSyncConfigs = (robotId: string, type: RobotConfigurationSyncConfigsTypeEnum) => {
		const { ROBOTS } = AppConfigService.AppServices.SCREENS.BUSINESS;
		const { ROBOT, SITE } = ROBOTS.CONFIGURATION.SYNC_CONFIGS;
		let url = type === RobotConfigurationSyncConfigsTypeEnum.SYNC_ROBOT ? ROBOT : SITE;
		url = url.replace(':robotId', robotId);
		return HttpClientService.post(
			url,
			{},
			{ headers: AppConfigService.AppRequestHeaders.json }
		);
	};

	/**
	 * fetch robot configuration
	 * @param robotId
	 * @returns
	 */
	robotConfigurationFetch = (robotId: string) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIGURATION.ROBOT_CONFIGS.ALL;
		return HttpClientService.get<RCContentInterface>(url, {
			params: {
				'filter[robot]': robotId
			}
		});
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
		payload: RCCDataElementInterface
	) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIGURATION.ROBOT_CONFIGS.SINGLE;
		return HttpClientService.patch(url.replace(':configId', configId), {
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
		});
	};
}
const instance = new RobotsService();
export default instance;
