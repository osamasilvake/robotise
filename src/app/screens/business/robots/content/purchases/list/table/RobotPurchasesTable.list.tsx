import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';
import { RobotPurchasesTableColumnInterface } from './RobotPurchasesTable.interface';

const common = 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS';
export const columns: RobotPurchasesTableColumnInterface[] = [
	{
		id: RobotPurchasesTableColumnsTypeEnum.TARGET,
		label: `${common}.TARGET`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.CREATED,
		label: `${common}.CREATED`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.TOTAL_PRICE,
		label: `${common}.TOTAL_PRICE`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.COMMENT,
		label: `${common}.COMMENT`,
		minWidth: 300,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.ORDER_STATUS,
		label: `${common}.ORDER_STATUS`,
		minWidth: 150,
		align: 'right'
	}
];
