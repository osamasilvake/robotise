export interface RobotPurchasesFetchListPayloadInterface {
	robotId: string | undefined;
	page: number;
	rowsPerPage: number;
	billed: boolean;
	debug: boolean;
}
