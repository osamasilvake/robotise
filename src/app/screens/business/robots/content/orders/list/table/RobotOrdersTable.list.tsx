import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';
import { RobotOrdersTableColumnInterface } from './RobotOrdersTable.interface';

// columns
export const columns: RobotOrdersTableColumnInterface[] = [
	{
		id: RobotOrdersTableColumnsTypeEnum.STATUS,
		label: 'CONTENT.ORDERS.LIST.TABLE.COLUMNS.STATUS',
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.TARGET,
		label: 'CONTENT.ORDERS.LIST.TABLE.COLUMNS.TARGET',
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.MODE,
		label: 'CONTENT.ORDERS.LIST.TABLE.COLUMNS.MODE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.CREATED,
		label: 'CONTENT.ORDERS.LIST.TABLE.COLUMNS.CREATED',
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.ORIGIN,
		label: 'CONTENT.ORDERS.LIST.TABLE.COLUMNS.ORIGIN',
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.DEBUG,
		label: 'CONTENT.ORDERS.LIST.TABLE.COLUMNS.DEBUG',
		minWidth: 170,
		align: 'right'
	}
];

// cancellable orders
export const CANCELLABLE_ORDERS = [
	'created',
	'in_progress:traveling',
	'in_progress:arrived',
	'pending'
];
