import { RobotOrderTableColumnsTypeEnum } from './RobotOrderTable.enum';
import { RobotOrderTableColumnInterface } from './RobotOrderTable.interface';

const translation = 'COMMON.ORDERS.DETAIL.TABLE.COLUMNS';
export const columns: RobotOrderTableColumnInterface[] = [
	{
		id: RobotOrderTableColumnsTypeEnum.DETAILS,
		label: `${translation}.STATUS`,
		minWidth: 350,
		align: 'left'
	},
	{
		id: RobotOrderTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		width: 200,
		align: 'left'
	},
	{
		id: RobotOrderTableColumnsTypeEnum.ELAPSED_TIME,
		label: `${translation}.ELAPSED_TIME`,
		width: 150,
		align: 'right'
	},
	{
		id: RobotOrderTableColumnsTypeEnum.AGGREGATED_TIME,
		label: `${translation}.AGGREGATED_TIME`,
		width: 180,
		align: 'right'
	}
];
