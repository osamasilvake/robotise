import { ExternalLinkPayloadInterface } from '../../../components/common/external-link/ExternalLink.interface';
import { AppConfigService, HttpClientService } from '../../../services';
import { SDContentInterface } from '../../../slices/settings/deep-links/DeepLink.interface';
import { DeepLinksAxiosGetInterface } from './DeepLinks.interface';
import { DeepLinksListPayloadInterface } from './list/DeepLinksList.interface';
import { DeepLinkCreateEditTypeEnum } from './list/table/DeepLinksTable.enum';
import { DialogCreateEditDeepLinkFormInterface } from './list/table/DeepLinksTable.interface';

class DeepLinksService {
	/**
	 * fetch deep links
	 * @param payload
	 * @returns
	 */
	deepLinksFetch = (payload: DeepLinksListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINKS;
		return HttpClientService.get<DeepLinksAxiosGetInterface>(url, {
			params: {
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * create/edit deep link
	 * @param deepLinkId
	 * @param payload
	 * @param type
	 * @returns
	 */
	deepLinkCreateEdit = (
		deepLinkId: string | undefined,
		payload: DialogCreateEditDeepLinkFormInterface,
		type: DeepLinkCreateEditTypeEnum
	) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINKS;
		if (type === DeepLinkCreateEditTypeEnum.EDIT) {
			return HttpClientService.patch(`${url}/${deepLinkId}`, {
				data: {
					type: 'deeplinks',
					id: deepLinkId,
					attributes: payload
				}
			});
		}
		return HttpClientService.post(url, {
			data: {
				type: 'deeplinks',
				attributes: payload
			}
		});
	};

	/**
	 * delete deep link
	 * @param deepLinkId
	 * @returns
	 */
	deepLinkDelete = (deepLinkId: string) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINKS;
		return HttpClientService.delete(`${url}/${deepLinkId}`);
	};

	/**
	 * fetch audit logs link
	 * @param payload
	 * @returns
	 */
	deepLinkAuditLogsLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.AUDIT_LOGS;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				site: payload.siteId,
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch alert logs link
	 * @param payload
	 * @returns
	 */
	deepLinkAlertLogsLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.ALERT_LOGS;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch alert dashboard logs link
	 * @param payload
	 * @returns
	 */
	deepLinkAlertDashboardLogsLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.ALERT_DASHBOARD_LOGS;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch battery link
	 * @param payload
	 * @returns
	 */
	deepLinkBatteryLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.BATTERY;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch cooling unit link
	 * @param payload
	 * @returns
	 */
	deepLinkCoolingUnitLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.COOLING_UNIT;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch diagnostics logs link
	 * @param payload
	 * @returns
	 */
	deepLinkDiagnosticsLogsLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.DIAGNOSTICS_LOGS;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch elevator dashboard link
	 * @param payload
	 * @returns
	 */
	deepLinkElevatorDashboardLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.ELEVATOR_DASHBOARD;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				site: payload.siteId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch elevator logs link
	 * @param payload
	 * @returns
	 */
	deepLinkElevatorLogsLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.ELEVATOR_LOGS;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				elevator_vendor: payload.vendor,
				from: payload.from,
				to: payload.to,
				call_id: payload.callId
			}
		});
	};

	/**
	 * fetch item tracking link
	 * @param payload
	 * @returns
	 */
	deepLinkItemTrackingLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.ITEM_TRACKING;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch scrapper link
	 * @param payload
	 * @returns
	 */
	deepLinkScrapperLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.SCRAPPER;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch temperature link
	 * @param payload
	 * @returns
	 */
	deepLinkTemperatureLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.TEMPERATURE;
		return HttpClientService.get<SDContentInterface>(url, {
			params: {
				robot: payload.robotId,
				from: payload.from,
				to: payload.to
			}
		});
	};

	/**
	 * fetch wiki page link
	 * @param payload
	 * @returns
	 */
	deepLinkWikiPageLinkFetch = (payload: ExternalLinkPayloadInterface) => {
		let url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINK.WIKI_PAGE;
		url = url.replace(':siteId', payload.siteId || '');
		return HttpClientService.get<SDContentInterface>(url);
	};
}
const instance = new DeepLinksService();
export default instance;
