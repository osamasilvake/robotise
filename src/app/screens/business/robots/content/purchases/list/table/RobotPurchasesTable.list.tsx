import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';
import { RobotPurchasesTableColumnInterface } from './RobotPurchasesTable.interface';

const translation = 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS';
export const columns: RobotPurchasesTableColumnInterface[] = [
	{
		id: RobotPurchasesTableColumnsTypeEnum.TARGET,
		label: `${translation}.TARGET`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.TOTAL_PRICE,
		label: `${translation}.TOTAL_PRICE`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.COMMENT,
		label: `${translation}.COMMENT`,
		minWidth: 300,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.ORDER_STATUS,
		label: `${translation}.ORDER_STATUS`,
		minWidth: 150,
		align: 'right'
	}
];
