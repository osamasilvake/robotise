import { RobotPurchaseDetailTableColumnsTypeEnum } from './RobotPurchaseDetailTable.enum';
import { RobotPurchaseDetailTableColumnInterface } from './RobotPurchaseDetailTable.interface';

export const columns: RobotPurchaseDetailTableColumnInterface[] = [
	{
		id: RobotPurchaseDetailTableColumnsTypeEnum.TITLE,
		label: 'CONTENT.PURCHASES.CONTENT.TABLE.COLUMNS.TITLE',
		minWidth: 300,
		align: 'left'
	},
	{
		id: RobotPurchaseDetailTableColumnsTypeEnum.QUANTITY,
		label: 'CONTENT.PURCHASES.CONTENT.TABLE.COLUMNS.QUANTITY',
		width: 120,
		align: 'left'
	},
	{
		id: RobotPurchaseDetailTableColumnsTypeEnum.PRICE_UNIT,
		label: 'CONTENT.PURCHASES.CONTENT.TABLE.COLUMNS.PRICE_UNIT',
		width: 100,
		align: 'left'
	},
	{
		id: RobotPurchaseDetailTableColumnsTypeEnum.PRICE_TOTAL,
		label: 'CONTENT.PURCHASES.CONTENT.TABLE.COLUMNS.PRICE_TOTAL',
		width: 120,
		align: 'right'
	}
];
