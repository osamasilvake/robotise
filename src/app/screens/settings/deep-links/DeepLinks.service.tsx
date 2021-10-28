import { AppConfigService, HttpClientService } from '../../../services';
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
}
const instance = new DeepLinksService();
export default instance;
