import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { DeepLinkResetTypeEnum } from '../../../screens/settings/deep-links/list/table/DeepLinksTable.enum';
import { JsonApiResponseInterface } from '../../JsonApi.interface';

export interface SliceDeepLinksInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SDLContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SDLContentInterface extends JsonApiResponseInterface {
	data: SDLDataInterface[];
	state?: SDLStateInterface;
}

export interface SDLDataInterface {
	id: string;
	key: string;
	name: string;
	description: string;
	link: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface SDLStateInterface {
	page?: number;
	rowsPerPage?: number;
	reset?: DeepLinkResetTypeEnum;
}
