export interface GeneralAllElevatorCallsListPayloadInterface {
	page: number;
	rowsPerPage: number;
	siteId?: string;
	callType?: string;
	includeAllCalls: boolean;
}
