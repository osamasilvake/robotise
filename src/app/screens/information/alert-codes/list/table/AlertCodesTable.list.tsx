import { AlertCodesTableColumnsTypeEnum } from './AlertCodesTable.enum';
import { AlertCodesTableColumnInterface } from './AlertCodesTable.interface';

const common = 'LIST.TABLE.COLUMNS';
export const columns: AlertCodesTableColumnInterface[] = [
	{
		id: AlertCodesTableColumnsTypeEnum.DESCRIPTION,
		label: `${common}.DESCRIPTION`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.SYSTEM,
		label: `${common}.SYSTEM`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.CODE,
		label: `${common}.CODE`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.NODE,
		label: `${common}.NODE`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.UPDATED_AT,
		label: `${common}.UPDATED_AT`,
		minWidth: 200,
		align: 'right'
	}
];
