import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { GeneralAllOrdersPeriodListInterface } from '../../../../screens/business/general/all-orders/list/actions/GeneralAllOrdersActions.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceAllOrdersInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SAOContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SAOContentInterface extends JsonAPIResponseInterface {
	data: SAODataInterface[];
	state?: SAOStateInterface;
}

export interface SAODataInterface {
	id: string;
	location: string;
	mode: string;
	status: string;
	origin: string;
	isDebug: boolean;
	updatedAt: Date;
	createdAt: Date;
	history: SAODataHistoryInterface[];
	orderReport: SAODataOrderReportInterface;
	site: SAODataSiteInterface;
	robot: SAODataRobotInterface;
	siteRobot: string;
}

export interface SAOStateInterface {
	page?: number;
	rowsPerPage?: number;
	siteId?: string;
	currentPeriod?: GeneralAllOrdersPeriodListInterface;
	includeAllOrders?: boolean;
}

export interface SAODataHistoryInterface {
	event: string;
	details: string;
	createdAt: Date;
	elapsedTime?: string;
	aggregatedTime?: string;
}

export interface SAODataOrderReportInterface {
	id: string;
}

export interface SAODataSiteInterface {
	id: string;
}

export interface SAODataRobotInterface {
	id: string;
}
