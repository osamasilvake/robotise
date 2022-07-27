import { RobotTopProductsTableColumnsTypeEnum } from './RobotTopProductsTable.enum';
import { RobotTopProductsTableColumnInterface } from './RobotTopProductsTable.interface';

const translation = 'CONTENT.PERFORMANCE.DEMOGRAPHY.TOP_PRODUCTS.TABLE.COLUMNS';
export const columns: RobotTopProductsTableColumnInterface[] = [
	{
		id: RobotTopProductsTableColumnsTypeEnum.IMAGE,
		label: `${translation}.IMAGE`,
		width: 50,
		align: 'left'
	},
	{
		id: RobotTopProductsTableColumnsTypeEnum.NAME,
		label: `${translation}.NAME`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotTopProductsTableColumnsTypeEnum.QUANTITY,
		label: `${translation}.QUANTITY`,
		width: 85,
		align: 'center'
	},
	{
		id: RobotTopProductsTableColumnsTypeEnum.PRICE,
		label: `${translation}.PRICE`,
		width: 85,
		align: 'right'
	}
];
