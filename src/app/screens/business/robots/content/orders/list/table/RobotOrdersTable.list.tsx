import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';
import { RobotOrdersTableColumnInterface } from './RobotOrdersTable.interface';

const translation = 'CONTENT.ORDERS.LIST.TABLE.COLUMNS';
export const columns: RobotOrdersTableColumnInterface[] = [
	{
		id: RobotOrdersTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.TARGET,
		label: `${translation}.TARGET`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.MODE,
		label: `${translation}.MODE`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.ORIGIN,
		label: `${translation}.ORIGIN`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotOrdersTableColumnsTypeEnum.LINK_PURCHASE,
		label: `${translation}.LINK_PURCHASE`,
		minWidth: 150,
		align: 'right',
		noSort: true
	}
];

// cancellable orders
export const cancellableOrders = [
	'created',
	'in_progress:traveling',
	'in_progress:arrived',
	'pending'
];
