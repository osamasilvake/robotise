import { JsonAPIResponseInterface } from '../../../slices/JsonAPI.interface';

export interface MiddlewareConfigAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: any;
	}[];
}
