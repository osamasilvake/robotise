import { ExternalLinkPayloadInterface } from '../../../components/common/external-link/ExternalLink.interface';
import { ReportFormInterface } from '../../../components/common/report/Report.interface';
import { AppConfigService, HttpClientService } from '../../../services';
import {
	SRContentDeepLinkInterface,
	SRContentMapInterface
} from '../../../slices/business/robots/Robot.slice.interface';
import { RTSContentStateInterface } from '../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { RobotCommandsLogListPayloadInterface } from './content/commands-log/list/RobotCommandsLogList.interface';
import { RobotConfigFormInterface } from './content/configuration/robot-config/RobotConfig.interface';
import { RobotSiteConfigFormInterface } from './content/configuration/robot-site-config/RobotSiteConfig.interface';
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
import {
	RobotCommandLogsAxiosGetInterface,
	RobotElevatorCallsAxiosGetInterface,
	RobotInventoryAxiosGetInterface,
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
	 * @param filters
	 * @returns
	 */
	robotTwinsSummaryFetch = (filters: RTSContentStateInterface | undefined) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ALL;
		return HttpClientService.get<RobotTwinSummaryAxiosGetInterface>(url, {
			params: {
				'filter[isHidden]': filters?.hidden ? undefined : false
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIG.replace(
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
	 * fetch audit logs link
	 * @param payload
	 * @returns
	 */
	robotAuditLogsLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.LINKS.AUDIT_LOGS;
		return HttpClientService.get<SRContentDeepLinkInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch robot map location
	 * @param mapId
	 * @returns
	 */
	robotMapLocationFetch = (mapId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.MAPS.replace(
			':mapId',
			mapId
		);
		return HttpClientService.get<SRContentMapInterface>(url);
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS;
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS;
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS;
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
	 * fetch robot order
	 * @param orderId
	 * @returns
	 */
	robotOrderFetch = (orderId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDER.replace(
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.PURCHASES;
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.PURCHASE.replace(
			':purchaseId',
			purchaseId
		);
		return HttpClientService.get<RobotPurchaseAxiosGetInterface>(url);
	};

	/**
	 * fetch item tracking link
	 * @param payload
	 * @returns
	 */
	robotItemTrackingLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.LINKS.ITEM_TRACKING;
		return HttpClientService.get<SRContentDeepLinkInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * sync products on the robot
	 * @param robotId
	 * @returns
	 */
	robotProductsSync = (robotId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.SYNC_PRODUCTS.replace(
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIG.replace(
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.CONFIG.replace(
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
	 * fetch elevator logs link
	 * @param payload
	 * @returns
	 */
	robotElevatorLogsLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.LINKS.ELEVATOR_LOGS;
		return HttpClientService.get<SRContentDeepLinkInterface>(url, {
			params: {
				elevator_vendor: payload.vendor,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * generate reports
	 * @param robotId
	 * @param payload
	 * @returns
	 */
	robotReportsGenerate = (robotId: string, payload: ReportFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.REPORTS.PURCHASES;
		return HttpClientService.get<string>(url, {
			params: {
				'filter[robot]': robotId,
				'filter[createdAt][gte]': payload.from,
				'filter[createdAt][lte]': payload.to
			}
		});
	};
}
const instance = new RobotsService();
export default instance;
