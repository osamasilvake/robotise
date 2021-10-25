export interface RobotPurchasesListPayloadInterface {
	page: number;
	rowsPerPage: number;
	billed: boolean;
	debug: boolean;
}

export interface RobotPurchaseItemTrackingPayloadInterface {
	from: Date;
	to: Date;
}
