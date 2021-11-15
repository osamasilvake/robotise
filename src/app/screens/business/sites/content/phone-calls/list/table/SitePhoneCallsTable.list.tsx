import { SitePhoneCallsTableColumnsTypeEnum } from './SitePhoneCallsTable.enum';
import { SitePhoneCallsTableColumnInterface } from './SitePhoneCallsTable.interface';

const translation = 'CONTENT.PHONE_CALLS.LIST.TABLE.COLUMNS';
export const columns: SitePhoneCallsTableColumnInterface[] = [
	{
		id: SitePhoneCallsTableColumnsTypeEnum.ROOM,
		label: `${translation}.ROOM`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.MODE,
		label: `${translation}.MODE`,
		minWidth: 120,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.FROM,
		label: `${translation}.FROM`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 250,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.UPDATED,
		label: `${translation}.UPDATED`,
		minWidth: 180,
		align: 'right'
	}
];
