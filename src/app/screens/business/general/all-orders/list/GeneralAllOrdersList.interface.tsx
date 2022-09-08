export interface GeneralAllOrdersListPayloadInterface {
	page: number;
	rowsPerPage: number;
	siteId?: string;
	period?: string;
	includeAllOrders: boolean;
}
