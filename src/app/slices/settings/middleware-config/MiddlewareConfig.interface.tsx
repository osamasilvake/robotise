import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { MiddlewareConfigResetTypeEnum } from '../../../screens/settings/middleware-config/list/table/MiddlewareConfigTable.enum';
import { JsonAPIResponseInterface } from '../../JsonAPI.interface';

export interface SliceMiddlewareConfigInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SMCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SMCContentInterface extends JsonAPIResponseInterface {
	data: SMCDataInterface[];
	state?: SMCStateInterface;
}

export interface SMCDataInterface {
	id: string;
	key: string;
	name: string;
	prop: string;
	desc: string;
	status: string;
	direction: string;
	traceMode: string;
	saveHistory: boolean;
	audit: boolean;
	debug: boolean;
	stopPropagate: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface SMCStateInterface {
	page?: number;
	rowsPerPage?: number;
	reset?: MiddlewareConfigResetTypeEnum;
}
