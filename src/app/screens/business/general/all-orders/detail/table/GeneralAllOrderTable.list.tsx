import { GeneralAllOrderTableColumnsTypeEnum } from './GeneralAllOrderTable.enum';
import { GeneralAllOrderTableColumnInterface } from './GeneralAllOrderTable.interface';

const translation = 'COMMON.ORDERS.DETAIL.TABLE.COLUMNS';
export const columns: GeneralAllOrderTableColumnInterface[] = [
	{
		id: GeneralAllOrderTableColumnsTypeEnum.DETAILS,
		label: `${translation}.STATUS`,
		minWidth: 350,
		align: 'left'
	},
	{
		id: GeneralAllOrderTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		width: 200,
		align: 'left'
	},
	{
		id: GeneralAllOrderTableColumnsTypeEnum.ELAPSED_TIME,
		label: `${translation}.ELAPSED_TIME`,
		width: 150,
		align: 'right'
	},
	{
		id: GeneralAllOrderTableColumnsTypeEnum.AGGREGATED_TIME,
		label: `${translation}.AGGREGATED_TIME`,
		width: 180,
		align: 'right'
	}
];
