import { SACDataInterface } from '../../../slices/information/alert-codes/AlertCodes.interface';
import { JsonApiResponse } from '../../../slices/JsonApi.interface';

export interface AlertCodesAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: SACDataInterface;
	}[];
}
