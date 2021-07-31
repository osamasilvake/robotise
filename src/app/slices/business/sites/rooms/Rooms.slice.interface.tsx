import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { ISite } from '../Sites.slice.interface';

export interface SliceRoomsInterface {
	updating: boolean;
	content: SRContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SRContentInterface {
	site: ISite;
	filters: SRFiltersInterface;
	siteId?: string;
}

export interface SRFiltersInterface {
	active: boolean;
	inactive: boolean;
}
