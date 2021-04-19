import { RobotInventoryTableColumnsTypeEnum } from './RobotInventoryTable.enum';
import { RobotInventoryTableColumnInterface } from './RobotInventoryTable.interface';

export const columns: RobotInventoryTableColumnInterface[] = [
	{
		id: RobotInventoryTableColumnsTypeEnum.IMAGE,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.IMAGE',
		width: 100,
		align: 'left'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.NAME,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.NAME',
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.SIZE,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.SIZE',
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.QUANTITY,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.QUANTITY',
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.CAPACITY,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.CAPACITY',
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.PRICE,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.PRICE',
		width: 125,
		align: 'right'
	}
];
