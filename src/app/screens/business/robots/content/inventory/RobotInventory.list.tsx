import { RobotInventoryColumnsTypeEnum } from './RobotInventory.enum';
import { RobotInventoryTableColumnInterface } from './RobotInventory.interface';

export const columns: RobotInventoryTableColumnInterface[] = [
	{
		id: RobotInventoryColumnsTypeEnum.IMAGE,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.IMAGE',
		width: 100,
		align: 'left'
	},
	{
		id: RobotInventoryColumnsTypeEnum.NAME,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.NAME',
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotInventoryColumnsTypeEnum.SIZE,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.SIZE',
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryColumnsTypeEnum.QUANTITY,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.QUANTITY',
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryColumnsTypeEnum.CAPACITY,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.CAPACITY',
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryColumnsTypeEnum.PRICE,
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.PRICE',
		width: 125,
		align: 'right'
	}
];
