import { RobotOrderTableColumnsTypeEnum } from './RobotOrderTable.enum';
import { RobotOrderTableColumnInterface } from './RobotOrderTable.interface';

const common = 'CONTENT.ORDERS.DETAIL.TABLE.COLUMNS';
export const columns: RobotOrderTableColumnInterface[] = [
	{
		id: RobotOrderTableColumnsTypeEnum.DETAILS,
		label: `${common}.STATUS`,
		width: 275,
		align: 'left'
	},
	{
		id: RobotOrderTableColumnsTypeEnum.CREATED_AT,
		label: `${common}.UPDATED_ON`,
		minWidth: 170,
		align: 'left'
	}
];
