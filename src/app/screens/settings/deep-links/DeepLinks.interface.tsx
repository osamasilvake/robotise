import { JsonAPIResponseInterface } from '../../../slices/JsonAPI.interface';
import { SDLDataInterface } from '../../../slices/settings/deep-links/DeepLinks.interface';

export interface DeepLinksAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SDLDataInterface;
	}[];
}
