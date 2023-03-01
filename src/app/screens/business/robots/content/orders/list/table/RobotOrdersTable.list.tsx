import { pxToRem } from '../../../../../../../utilities/methods/Number';
import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';
import { RobotOrdersTableColumnInterface } from './RobotOrdersTable.interface';

const translation = 'COMMON.ORDERS.LIST.TABLE.COLUMNS';
export const columns: RobotOrdersTableColumnInterface[] = [
	{
		id: RobotOrdersTableColumnsTypeEnum.ID,
		label: `${translation}.ID`,
		width: 20,
		align: 'right',
		noSort: true,
		padding: `0 ${pxToRem(5)}`
	},
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
		id: RobotOrdersTableColumnsTypeEnum.PURCHASE_DETAILS,
		label: `${translation}.PURCHASE_DETAILS`,
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
