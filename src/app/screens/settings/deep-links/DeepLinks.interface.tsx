import { JsonApiResponse } from '../../../slices/JsonApi.interface';
import { SDLDataInterface } from '../../../slices/settings/deep-links/DeepLinks.interface';

export interface DeepLinksAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: SDLDataInterface;
	}[];
}
