import { DeepLinkResetTypeEnum } from './table/DeepLinksTable.enum';

export interface DeepLinksListPayloadInterface {
	page: number;
	rowsPerPage: number;
	reset?: DeepLinkResetTypeEnum;
}
