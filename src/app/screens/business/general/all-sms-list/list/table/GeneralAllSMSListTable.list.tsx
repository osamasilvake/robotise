import { GeneralAllSMSListTableColumnsTypeEnum } from './GeneralAllSMSListTable.enum';
import { GeneralAllSMSListTableColumnInterface } from './GeneralAllSMSListTable.interface';

const translation = 'COMMON.SMS_LIST.LIST.TABLE.COLUMNS';
export const columns: GeneralAllSMSListTableColumnInterface[] = [
	{
		id: GeneralAllSMSListTableColumnsTypeEnum.UPDATED,
		label: `${translation}.UPDATED`,
		minWidth: 180,
		align: 'left'
	},
	{
		id: GeneralAllSMSListTableColumnsTypeEnum.TYPE,
		label: `${translation}.TYPE`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: GeneralAllSMSListTableColumnsTypeEnum.ROOM,
		label: `${translation}.ROOM`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: GeneralAllSMSListTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 120,
		align: 'left'
	},
	{
		id: GeneralAllSMSListTableColumnsTypeEnum.FROM,
		label: `${translation}.FROM`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: GeneralAllSMSListTableColumnsTypeEnum.TO,
		label: `${translation}.TO`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: GeneralAllSMSListTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 180,
		align: 'left',
		noSort: true
	}
];
