import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';
import { RobotPurchasesTableColumnInterface } from './RobotPurchasesTable.interface';

const common = 'CONTENT.PURCHASES.LIST.TABLE.COLUMNS';
export const columns: RobotPurchasesTableColumnInterface[] = [
	{
		id: RobotPurchasesTableColumnsTypeEnum.TARGET,
		label: `${common}.TARGET`,
		minWidth: 180,
		align: 'left'
	},
	{
		id: RobotPurchasesTableColumnsTypeEnum.CREATED,
		label: `${common}.CREATED`,
		minWidth: 250,
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
		minWidth: 450,
		align: 'left'
	}
];
