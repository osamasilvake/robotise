import { RobotPurchaseTableColumnsTypeEnum } from './RobotPurchaseTable.enum';
import { RobotPurchaseTableColumnInterface } from './RobotPurchaseTable.interface';

export const columns: RobotPurchaseTableColumnInterface[] = [
	{
		id: RobotPurchaseTableColumnsTypeEnum.TITLE,
		label: 'CONTENT.PURCHASES.DETAIL.TABLE.COLUMNS.TITLE',
		minWidth: 300,
		align: 'left'
	},
	{
		id: RobotPurchaseTableColumnsTypeEnum.QUANTITY,
		label: 'CONTENT.PURCHASES.DETAIL.TABLE.COLUMNS.QUANTITY',
		width: 120,
		align: 'left'
	},
	{
		id: RobotPurchaseTableColumnsTypeEnum.PRICE_UNIT,
		label: 'CONTENT.PURCHASES.DETAIL.TABLE.COLUMNS.PRICE_UNIT',
		width: 100,
		align: 'left'
	},
	{
		id: RobotPurchaseTableColumnsTypeEnum.PRICE_TOTAL,
		label: 'CONTENT.PURCHASES.DETAIL.TABLE.COLUMNS.PRICE_TOTAL',
		width: 120,
		align: 'right'
	}
];
