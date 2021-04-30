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
		width: 100,
		align: 'left'
	},
	{
		id: RobotPurchaseDetailTableColumnsTypeEnum.PRICE,
		label: 'CONTENT.PURCHASES.CONTENT.TABLE.COLUMNS.PRICE',
		width: 150,
		align: 'right'
	}
];
