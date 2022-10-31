import { SiteSMSListTableColumnsTypeEnum } from './SiteSMSListTable.enum';
import { SiteSMSListTableColumnInterface } from './SiteSMSListTable.interface';

const translation = 'CONTENT.SMS_LIST.LIST.TABLE.COLUMNS';
export const columns: SiteSMSListTableColumnInterface[] = [
	{
		id: SiteSMSListTableColumnsTypeEnum.UPDATED,
		label: `${translation}.UPDATED`,
		minWidth: 180,
		align: 'left'
	},
	{
		id: SiteSMSListTableColumnsTypeEnum.TYPE,
		label: `${translation}.TYPE`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: SiteSMSListTableColumnsTypeEnum.ROOM,
		label: `${translation}.ROOM`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: SiteSMSListTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 120,
		align: 'left'
	},
	{
		id: SiteSMSListTableColumnsTypeEnum.FROM,
		label: `${translation}.FROM`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: SiteSMSListTableColumnsTypeEnum.TO,
		label: `${translation}.TO`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: SiteSMSListTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 180,
		align: 'left',
		noSort: true
	}
];
