import { JsonApiResponseInterface } from '../../../slices/JsonApi.interface';
import { SDLDataInterface } from '../../../slices/settings/deep-links/DeepLinks.interface';

export interface DeepLinksAxiosGetInterface extends JsonApiResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SDLDataInterface;
	}[];
}
