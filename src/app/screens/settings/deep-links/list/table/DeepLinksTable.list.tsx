import { DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';
import { DeepLinksTableColumnInterface } from './DeepLinksTable.interface';

const translation = 'LIST.TABLE.COLUMNS';
export const columns: DeepLinksTableColumnInterface[] = [
	{
		id: DeepLinksTableColumnsTypeEnum.NAME,
		label: `${translation}.NAME`,
		minWidth: 130,
		align: 'left'
	},
	{
		id: DeepLinksTableColumnsTypeEnum.DESCRIPTION,
		label: `${translation}.DESCRIPTION`,
		minWidth: 220,
		align: 'left'
	},
	{
		id: DeepLinksTableColumnsTypeEnum.KEY,
		label: `${translation}.KEY`,
		minWidth: 130,
		align: 'left'
	},
	{
		id: DeepLinksTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: DeepLinksTableColumnsTypeEnum.ACTIONS,
		label: `${translation}.ACTIONS`,
		minWidth: 145,
		align: 'right',
		noSort: true
	}
];
