import { AppConfigService, HttpClientService } from '../../../services';
import { MiddlewareConfigListPayloadInterface } from './list/MiddlewareConfigList.interface';
import { MiddlewareConfigCreateEditTypeEnum } from './list/table/MiddlewareConfigTable.enum';
import { DialogCreateEditMiddlewareConfigFormInterface } from './list/table/MiddlewareConfigTable.interface';
import { MiddlewareConfigAxiosGetInterface } from './MiddlewareConfig.interface';

class MiddlewareConfigService {
	/**
	 * fetch middleware config
	 * @param payload
	 * @returns
	 */
	middlewareConfigFetch = (payload: MiddlewareConfigListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.MIDDLEWARE_CONFIG;
		return HttpClientService.get<MiddlewareConfigAxiosGetInterface>(url, {
			params: {
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * create/edit middleware config
	 * @param middlewareConfigId
	 * @param payload
	 * @param type
	 * @returns
	 */
	middlewareConfigCreateEdit = (
		middlewareConfigId: string | undefined,
		payload: DialogCreateEditMiddlewareConfigFormInterface,
		type: MiddlewareConfigCreateEditTypeEnum
	) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.MIDDLEWARE_CONFIG;
		if (type === MiddlewareConfigCreateEditTypeEnum.EDIT) {
			return HttpClientService.patch(`${url}/${middlewareConfigId}`, {
				data: {
					type: 'cmdEvents',
					id: middlewareConfigId,
					attributes: payload
				}
			});
		}
		return HttpClientService.post(url, {
			data: {
				type: 'cmdEvents',
				attributes: payload
			}
		});
	};

	/**
	 * delete middleware config
	 * @param middlewareConfigId
	 * @returns
	 */
	middlewareConfigDelete = (middlewareConfigId: string) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.MIDDLEWARE_CONFIG;
		return HttpClientService.delete(`${url}/${middlewareConfigId}`);
	};
}
const instance = new MiddlewareConfigService();
export default instance;
