import { DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';
import { DeepLinksTableColumnInterface } from './DeepLinksTable.interface';

const translation = 'LIST.TABLE.COLUMNS';
export const columns: DeepLinksTableColumnInterface[] = [
	{
		id: DeepLinksTableColumnsTypeEnum.NAME,
		label: `${translation}.NAME`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: DeepLinksTableColumnsTypeEnum.DESCRIPTION,
		label: `${translation}.DESCRIPTION`,
		minWidth: 250,
		align: 'left'
	},
	{
		id: DeepLinksTableColumnsTypeEnum.LINK,
		label: `${translation}.LINK`,
		minWidth: 170,
		align: 'left',
		noSort: true
	},
	{
		id: DeepLinksTableColumnsTypeEnum.UPDATED_AT,
		label: `${translation}.UPDATED_AT`,
		minWidth: 200,
		align: 'right'
	}
];
