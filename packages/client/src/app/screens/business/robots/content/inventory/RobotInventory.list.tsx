import { RobotInventoryTableColumnInterface } from './RobotInventory.interface';

export const columns: RobotInventoryTableColumnInterface[] = [
	{
		id: 'image',
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.IMAGE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'name',
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.NAME',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'volume',
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.SIZE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'quantity',
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.QUANTITY',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'capacity',
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.CAPACITY',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'price',
		label: 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS.PRICE',
		minWidth: 170,
		align: 'right'
	}
];
