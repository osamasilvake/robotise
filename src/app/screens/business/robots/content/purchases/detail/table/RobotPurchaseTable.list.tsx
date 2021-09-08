import { RobotPurchaseTableColumnsTypeEnum } from './RobotPurchaseTable.enum';
import { RobotPurchaseTableColumnInterface } from './RobotPurchaseTable.interface';

const translation = 'CONTENT.PURCHASES.DETAIL.TABLE.COLUMNS';
export const columns: RobotPurchaseTableColumnInterface[] = [
	{
		id: RobotPurchaseTableColumnsTypeEnum.TITLE,
		label: `${translation}.TITLE`,
		minWidth: 300,
		align: 'left'
	},
	{
		id: RobotPurchaseTableColumnsTypeEnum.QUANTITY,
		label: `${translation}.QUANTITY`,
		width: 120,
		align: 'left'
	},
	{
		id: RobotPurchaseTableColumnsTypeEnum.PRICE_UNIT,
		label: `${translation}.PRICE_UNIT`,
		width: 100,
		align: 'left'
	},
	{
		id: RobotPurchaseTableColumnsTypeEnum.PRICE_TOTAL,
		label: `${translation}.PRICE_TOTAL`,
		width: 120,
		align: 'right'
	}
];
