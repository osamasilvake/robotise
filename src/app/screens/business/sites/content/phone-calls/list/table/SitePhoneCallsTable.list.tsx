import { pxToRem } from '../../../../../../../utilities/methods/Number';
import { SitePhoneCallsTableColumnsTypeEnum } from './SitePhoneCallsTable.enum';
import { SitePhoneCallsTableColumnInterface } from './SitePhoneCallsTable.interface';

const translation = 'COMMON.PHONE_CALLS.LIST.TABLE.COLUMNS';
export const columns: SitePhoneCallsTableColumnInterface[] = [
	{
		id: SitePhoneCallsTableColumnsTypeEnum.ID,
		label: `${translation}.ID`,
		width: 20,
		align: 'right',
		noSort: true,
		padding: `0 ${pxToRem(5)}`
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.UPDATED,
		label: `${translation}.UPDATED`,
		minWidth: 180,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.TYPE,
		label: `${translation}.TYPE`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.ROOM,
		label: `${translation}.ROOM`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 130,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.FROM,
		label: `${translation}.FROM`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.TO,
		label: `${translation}.TO`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: SitePhoneCallsTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 450,
		align: 'left',
		noSort: true
	}
];
