import { RobotOrderTableColumnsTypeEnum } from './RobotOrderTable.enum';
import { RobotOrderTableColumnInterface } from './RobotOrderTable.interface';

export const columns: RobotOrderTableColumnInterface[] = [
	{
		id: RobotOrderTableColumnsTypeEnum.DETAILS,
		label: 'CONTENT.ORDERS.DETAIL.TABLE.COLUMNS.STATUS',
		width: 225,
		align: 'left'
	},
	{
		id: RobotOrderTableColumnsTypeEnum.CREATED_AT,
		label: 'CONTENT.ORDERS.DETAIL.TABLE.COLUMNS.UPDATED_ON',
		minWidth: 170,
		align: 'left'
	}
];
