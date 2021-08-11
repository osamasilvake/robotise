export interface RobotPurchasesListPayloadInterface {
	pRobotId?: string;
	page: number;
	rowsPerPage: number;
	billed: boolean;
	debug: boolean;
}
