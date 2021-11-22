import { SACDataInterface } from '../../../slices/information/alert-codes/AlertCodes.interface';
import { JsonAPIResponseInterface } from '../../../slices/JsonAPI.interface';

export interface AlertCodesAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SACDataInterface;
	}[];
}
