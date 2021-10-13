import { SitePhoneConfigsTableColumnsTypeEnum } from './SitePhoneConfigsTable.enum';
import { SitePhoneConfigsTableColumnInterface } from './SitePhoneConfigsTable.interface';

const translation = 'CONTENT.PHONE_CONFIGS.LIST.TABLE.COLUMNS';
export const columns: SitePhoneConfigsTableColumnInterface[] = [
	{
		id: SitePhoneConfigsTableColumnsTypeEnum.PREFIXES,
		label: `${translation}.PREFIXES`,
		minWidth: 120,
		align: 'left',
		noSort: true
	},
	{
		id: SitePhoneConfigsTableColumnsTypeEnum.FROM,
		label: `${translation}.FROM`,
		minWidth: 120,
		align: 'left',
		noSort: true
	},
	{
		id: SitePhoneConfigsTableColumnsTypeEnum.WORKFLOW,
		label: `${translation}.WORKFLOW`,
		minWidth: 120,
		align: 'left'
	},
	{
		id: SitePhoneConfigsTableColumnsTypeEnum.MESSAGES,
		label: `${translation}.MESSAGES`,
		minWidth: 250,
		align: 'left',
		noSort: true
	},
	{
		id: SitePhoneConfigsTableColumnsTypeEnum.MODE,
		label: `${translation}.MODE`,
		minWidth: 120,
		align: 'right'
	}
];
