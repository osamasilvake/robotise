import { SECDataInterface } from '../../../slices/business/general/emails/Emails.slice.interface';
import { JsonAPIResponseInterface } from '../../../slices/JsonAPI.interface';

export interface GeneralEmailsAxiosGetInterface extends JsonAPIResponseInterface {
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
