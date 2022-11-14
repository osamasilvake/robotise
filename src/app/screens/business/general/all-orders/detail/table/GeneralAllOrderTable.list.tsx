import { GeneralAllOrderTableColumnsTypeEnum } from './GeneralAllOrderTable.enum';
import { GeneralAllOrderTableColumnInterface } from './GeneralAllOrderTable.interface';

const translation = 'COMMON.ORDERS.DETAIL.TABLE.COLUMNS';
export const columns: GeneralAllOrderTableColumnInterface[] = [
	{
		id: GeneralAllOrderTableColumnsTypeEnum.DETAILS,
		label: `${translation}.STATUS`,
		width: 350,
		align: 'left'
	},
	{
		id: GeneralAllOrderTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 170,
		align: 'left'
	}
];
