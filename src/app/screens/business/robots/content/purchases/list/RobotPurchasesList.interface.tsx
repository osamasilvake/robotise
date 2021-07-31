export interface RobotPurchasesListPayloadInterface {
	robotId: string | undefined;
	page: number;
	rowsPerPage: number;
	billed: boolean;
	debug: boolean;
}
