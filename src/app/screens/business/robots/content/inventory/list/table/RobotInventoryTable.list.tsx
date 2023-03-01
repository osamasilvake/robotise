import { pxToRem } from '../../../../../../../utilities/methods/Number';
import { RobotInventoryTableColumnsTypeEnum } from './RobotInventoryTable.enum';
import { RobotInventoryTableColumnInterface } from './RobotInventoryTable.interface';

const translation = 'CONTENT.INVENTORY.DRAWERS.TABLE.COLUMNS';
export const columns: RobotInventoryTableColumnInterface[] = [
	{
		id: RobotInventoryTableColumnsTypeEnum.ID,
		label: `${translation}.ID`,
		width: 20,
		align: 'right',
		padding: `0 ${pxToRem(5)}`
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.IMAGE,
		label: `${translation}.IMAGE`,
		width: 100,
		align: 'left'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.NAME,
		label: `${translation}.NAME`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.SIZE,
		label: `${translation}.SIZE`,
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.QUANTITY,
		label: `${translation}.QUANTITY`,
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.CAPACITY,
		label: `${translation}.CAPACITY`,
		width: 150,
		align: 'center'
	},
	{
		id: RobotInventoryTableColumnsTypeEnum.PRICE,
		label: `${translation}.PRICE`,
		width: 125,
		align: 'right'
	}
];
