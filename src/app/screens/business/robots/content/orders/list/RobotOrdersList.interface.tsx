export interface RobotOrdersListPayloadInterface {
	page: number;
	rowsPerPage: number;
	activeOrders: boolean;
	debug: boolean;
	marketingRides: boolean;
	coldCalls: boolean;
}
