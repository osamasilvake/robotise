import { RobotPurchaseTableColumnsTypeEnum } from './RobotPurchaseTable.enum';
import { RobotPurchaseTableColumnInterface } from './RobotPurchaseTable.interface';

const common = 'CONTENT.PURCHASES.DETAIL.TABLE.COLUMNS';
export const columns: RobotPurchaseTableColumnInterface[] = [
	{
		id: RobotPurchaseTableColumnsTypeEnum.TITLE,
		label: `${common}.TITLE`,
		minWidth: 300,
		align: 'left'
	},
	{
		id: RobotPurchaseTableColumnsTypeEnum.QUANTITY,
		label: `${common}.QUANTITY`,
		width: 120,
		align: 'left'
	},
	{
		id: RobotPurchaseTableColumnsTypeEnum.PRICE_UNIT,
		label: `${common}.PRICE_UNIT`,
		width: 100,
		align: 'left'
	},
	{
		id: RobotPurchaseTableColumnsTypeEnum.PRICE_TOTAL,
		label: `${common}.PRICE_TOTAL`,
		width: 120,
		align: 'right'
	}
];
