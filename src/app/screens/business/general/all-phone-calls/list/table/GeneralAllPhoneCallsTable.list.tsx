import { GeneralAllPhoneCallsTableColumnsTypeEnum } from './GeneralAllPhoneCallsTable.enum';
import { GeneralAllPhoneCallsTableColumnInterface } from './GeneralAllPhoneCallsTable.interface';

const translation = 'COMMON.PHONE_CALLS.LIST.TABLE.COLUMNS';
export const columns: GeneralAllPhoneCallsTableColumnInterface[] = [
	{
		id: GeneralAllPhoneCallsTableColumnsTypeEnum.SITE_ROBOT,
		label: `${translation}.SITE_ROBOT`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: GeneralAllPhoneCallsTableColumnsTypeEnum.UPDATED,
		label: `${translation}.UPDATED`,
		minWidth: 180,
		align: 'left'
	},
	{
		id: GeneralAllPhoneCallsTableColumnsTypeEnum.TYPE,
		label: `${translation}.TYPE`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: GeneralAllPhoneCallsTableColumnsTypeEnum.ROOM,
		label: `${translation}.ROOM`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: GeneralAllPhoneCallsTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 130,
		align: 'left'
	},
	{
		id: GeneralAllPhoneCallsTableColumnsTypeEnum.FROM,
		label: `${translation}.FROM`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: GeneralAllPhoneCallsTableColumnsTypeEnum.TO,
		label: `${translation}.TO`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: GeneralAllPhoneCallsTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 180,
		align: 'left',
		noSort: true
	}
];
