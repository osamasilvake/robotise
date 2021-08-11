export interface RobotOrdersListPayloadInterface {
	pRobotId?: string;
	page: number;
	rowsPerPage: number;
	activeOrders: boolean;
	debug: boolean;
}
