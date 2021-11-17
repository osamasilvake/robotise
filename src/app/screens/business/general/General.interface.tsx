import { SECDataInterface } from '../../../slices/business/general/emails/Emails.slice.interface';
import { JsonApiResponseInterface } from '../../../slices/JsonApi.interface';

export interface GeneralEmailsAxiosGetInterface extends JsonApiResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SECDataInterface;
	}[];
}

export interface GeneralEmailAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SECDataInterface;
	};
}
