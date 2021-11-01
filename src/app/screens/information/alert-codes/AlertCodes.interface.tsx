import { SACDataInterface } from '../../../slices/information/alert-codes/AlertCodes.interface';
import { JsonApiResponseInterface } from '../../../slices/JsonApi.interface';

export interface AlertCodesAxiosGetInterface extends JsonApiResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SACDataInterface;
	}[];
}
