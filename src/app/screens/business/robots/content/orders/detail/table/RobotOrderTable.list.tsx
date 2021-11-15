import { RobotOrderTableColumnsTypeEnum } from './RobotOrderTable.enum';
import { RobotOrderTableColumnInterface } from './RobotOrderTable.interface';

const translation = 'CONTENT.ORDERS.DETAIL.TABLE.COLUMNS';
export const columns: RobotOrderTableColumnInterface[] = [
	{
		id: RobotOrderTableColumnsTypeEnum.DETAILS,
		label: `${translation}.STATUS`,
		width: 320,
		align: 'left'
	},
	{
		id: RobotOrderTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 170,
		align: 'left'
	}
];
