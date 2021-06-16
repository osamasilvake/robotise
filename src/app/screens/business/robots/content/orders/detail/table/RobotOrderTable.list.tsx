import { RobotOrderTableColumnsTypeEnum } from './RobotOrderTable.enum';
import { RobotOrderTableColumnInterface } from './RobotOrderTable.interface';

export const columns: RobotOrderTableColumnInterface[] = [
	{
		id: RobotOrderTableColumnsTypeEnum.DETAILS,
		label: 'CONTENT.ORDERS.CONTENT.TABLE.COLUMNS.STATUS',
		width: 225,
		align: 'left'
	},
	{
		id: RobotOrderTableColumnsTypeEnum.CREATED_AT,
		label: 'CONTENT.ORDERS.CONTENT.TABLE.COLUMNS.UPDATED_ON',
		minWidth: 170,
		align: 'left'
	}
];
