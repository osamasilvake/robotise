import { JsonAPIResponseInterface } from '../../../slices/JsonAPI.interface';
import { SMCDataInterface } from '../../../slices/settings/middleware-config/MiddlewareConfig.interface';

export interface MiddlewareConfigAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SMCDataInterface;
	}[];
}
