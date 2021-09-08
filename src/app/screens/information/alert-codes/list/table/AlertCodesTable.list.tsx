import { AlertCodesTableColumnsTypeEnum } from './AlertCodesTable.enum';
import { AlertCodesTableColumnInterface } from './AlertCodesTable.interface';

const translation = 'LIST.TABLE.COLUMNS';
export const columns: AlertCodesTableColumnInterface[] = [
	{
		id: AlertCodesTableColumnsTypeEnum.DESCRIPTION,
		label: `${translation}.DESCRIPTION`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.SYSTEM,
		label: `${translation}.SYSTEM`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.CODE,
		label: `${translation}.CODE`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.NODE,
		label: `${translation}.NODE`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: AlertCodesTableColumnsTypeEnum.UPDATED_AT,
		label: `${translation}.UPDATED_AT`,
		minWidth: 200,
		align: 'right'
	}
];
