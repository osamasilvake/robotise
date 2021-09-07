import { RobotOrderTableColumnsTypeEnum } from './RobotOrderTable.enum';
import { RobotOrderTableColumnInterface } from './RobotOrderTable.interface';

const translation = 'CONTENT.ORDERS.DETAIL.TABLE.COLUMNS';
export const columns: RobotOrderTableColumnInterface[] = [
	{
		id: RobotOrderTableColumnsTypeEnum.DETAILS,
		label: `${translation}.STATUS`,
		width: 275,
		align: 'left'
	},
	{
		id: RobotOrderTableColumnsTypeEnum.CREATED_AT,
		label: `${translation}.UPDATED_ON`,
		minWidth: 170,
		align: 'left'
	}
];
