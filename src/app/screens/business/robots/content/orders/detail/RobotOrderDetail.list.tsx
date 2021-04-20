import { RobotOrderColumnsTypeEnum } from './RobotOrderDetail.enum';
import { RobotOrderTableColumnInterface } from './RobotOrderDetail.interface';

export const columns: RobotOrderTableColumnInterface[] = [
	{
		id: RobotOrderColumnsTypeEnum.DETAILS,
		label: 'CONTENT.ORDERS.CONTENT.TABLE.COLUMNS.STATUS',
		width: 225,
		align: 'left'
	},
	{
		id: RobotOrderColumnsTypeEnum.CREATED_AT,
		label: 'CONTENT.ORDERS.CONTENT.TABLE.COLUMNS.UPDATED_ON',
		minWidth: 170,
		align: 'left'
	}
];
