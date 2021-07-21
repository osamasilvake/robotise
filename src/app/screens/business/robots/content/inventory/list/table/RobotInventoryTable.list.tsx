import { RobotInventoryTableColumnsTypeEnum } from './RobotInventoryTable.enum';
import { RobotInventoryTableColumnInterface } from './RobotInventoryTable.interface';

const common = 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS';
export const columns: RobotInventoryTableColumnInterface[] = [
	{
		id: RobotInventoryTableColumnsTypeEnum.IMAGE,
		label: `${common}.IMAGE`,
		width: 100,
		align: 'left'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.NAME,
		label: `${common}.NAME`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.SIZE,
		label: `${common}.SIZE`,
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.QUANTITY,
		label: `${common}.QUANTITY`,
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.CAPACITY,
		label: `${common}.CAPACITY`,
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.PRICE,
		label: `${common}.PRICE`,
		width: 125,
		align: 'right'
	}
];
