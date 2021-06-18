import { AlertCodesTableColumnsTypeEnum } from './AlertCodesTable.enum';
import { AlertCodesTableColumnInterface } from './AlertCodesTable.interface';

export const columns: AlertCodesTableColumnInterface[] = [
	{
		id: AlertCodesTableColumnsTypeEnum.DESCRIPTION,
		label: 'LIST.TABLE.COLUMNS.DESCRIPTION',
		minWidth: 170,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.SYSTEM,
		label: 'LIST.TABLE.COLUMNS.SYSTEM',
		minWidth: 100,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.CODE,
		label: 'LIST.TABLE.COLUMNS.CODE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.NODE,
		label: 'LIST.TABLE.COLUMNS.NODE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.UPDATED_AT,
		label: 'LIST.TABLE.COLUMNS.UPDATED_AT',
		minWidth: 200,
		align: 'right'
	}
];
