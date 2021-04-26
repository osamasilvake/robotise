import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';
import { RobotPurchasesTableColumnInterface } from './RobotPurchasesTable.interface';

// columns
export const columns: RobotPurchasesTableColumnInterface[] = [
	{
		id: RobotPurchasesTableColumnsTypeEnum.TARGET,
		label: 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS.TARGET',
		width: 120,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.CREATED,
		label: 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS.CREATED',
		width: 220,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.TOTAL_PRICE,
		label: 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS.TOTAL_PRICE',
		width: 150,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.COMMENT,
		label: 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS.COMMENT',
		minWidth: 300,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.BILLED,
		label: 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS.BILLED',
		minWidth: 120,
		align: 'right'
	}
];
