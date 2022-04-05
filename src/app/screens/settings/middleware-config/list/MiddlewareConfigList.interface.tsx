import { MiddlewareConfigResetTypeEnum } from './table/MiddlewareConfigTable.enum';

export interface MiddlewareConfigListPayloadInterface {
	page: number;
	rowsPerPage: number;
	reset?: MiddlewareConfigResetTypeEnum;
}
