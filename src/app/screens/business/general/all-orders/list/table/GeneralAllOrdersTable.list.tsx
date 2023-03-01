import { pxToRem } from '../../../../../../utilities/methods/Number';
import { GeneralAllOrdersTableColumnsTypeEnum } from './GeneralAllOrdersTable.enum';
import { GeneralAllOrdersTableColumnInterface } from './GeneralAllOrdersTable.interface';

const translation = 'COMMON.ORDERS.LIST.TABLE.COLUMNS';
export const columns: GeneralAllOrdersTableColumnInterface[] = [
	{
		id: GeneralAllOrdersTableColumnsTypeEnum.ID,
		label: `${translation}.ID`,
		width: 20,
		align: 'right',
		noSort: true,
		padding: `0 ${pxToRem(5)}`
	},
	{
		id: GeneralAllOrdersTableColumnsTypeEnum.SITE_ROBOT,
		label: `${translation}.SITE_ROBOT`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: GeneralAllOrdersTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: GeneralAllOrdersTableColumnsTypeEnum.TARGET,
		label: `${translation}.TARGET`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: GeneralAllOrdersTableColumnsTypeEnum.MODE,
		label: `${translation}.MODE`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: GeneralAllOrdersTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: GeneralAllOrdersTableColumnsTypeEnum.ORIGIN,
		label: `${translation}.ORIGIN`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: GeneralAllOrdersTableColumnsTypeEnum.PURCHASE_DETAILS,
		label: `${translation}.PURCHASE_DETAILS`,
		minWidth: 150,
		align: 'right',
		noSort: true
	}
];
