export interface RobotOrdersFetchListInterface {
	robotId: string | undefined;
	page: number;
	rowsPerPage: number;
	activeOrders: boolean;
	debug: boolean;
}
