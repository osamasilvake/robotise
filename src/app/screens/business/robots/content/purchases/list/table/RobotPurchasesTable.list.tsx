import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';
import { RobotPurchasesTableColumnInterface } from './RobotPurchasesTable.interface';

// columns
export const columns: RobotPurchasesTableColumnInterface[] = [
	{
		id: RobotPurchasesTableColumnsTypeEnum.TARGET,
		label: 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS.TARGET',
		minWidth: 180,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.CREATED,
		label: 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS.CREATED',
		minWidth: 250,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.COMMENT,
		label: 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS.COMMENT',
		minWidth: 450,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.TOTAL_PRICE,
		label: 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS.TOTAL_PRICE',
		minWidth: 150,
		align: 'right'
	}
];
