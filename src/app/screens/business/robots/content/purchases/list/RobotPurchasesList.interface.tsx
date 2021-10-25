export interface RobotPurchasesListPayloadInterface {
	page: number;
	rowsPerPage: number;
	billed: boolean;
	debug: boolean;
}

export interface RobotPurchaseItemTrackingPayloadInterface {
	purchaseId: string;
	from: Date;
	to: Date;
}
