import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';
import { RobotOrdersTableColumnInterface } from './RobotOrdersTable.interface';

const common = 'CONTENT.ORDERS.LIST.TABLE.COLUMNS';
export const columns: RobotOrdersTableColumnInterface[] = [
	{
		id: RobotOrdersTableColumnsTypeEnum.STATUS,
		label: `${common}.STATUS`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.TARGET,
		label: `${common}.TARGET`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.MODE,
		label: `${common}.MODE`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.CREATED,
		label: `${common}.CREATED`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.ORIGIN,
		label: `${common}.ORIGIN`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.PURCHASE_REPORT,
		label: `${common}.PURCHASE_REPORT`,
		minWidth: 150,
		align: 'right'
	}
];

// cancellable orders
export const cancellableOrders = [
	'created',
	'in_progress:traveling',
	'in_progress:arrived',
	'pending'
];
