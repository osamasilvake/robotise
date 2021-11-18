import { GeneralEmailsTableColumnsTypeEnum } from './GeneralEmailsTable.enum';
import { GeneralEmailsTableColumnInterface } from './GeneralEmailsTable.interface';

const translation = 'CONTENT.EMAILS.LIST.TABLE.COLUMNS';
export const columns: GeneralEmailsTableColumnInterface[] = [
	{
		id: GeneralEmailsTableColumnsTypeEnum.RECIPIENT,
		label: `${translation}.RECIPIENT`,
		minWidth: 120,
		align: 'left'
	},
	{
		id: GeneralEmailsTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 120,
		align: 'left'
	},
	{
		id: GeneralEmailsTableColumnsTypeEnum.SITE,
		label: `${translation}.SITE`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: GeneralEmailsTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 300,
		align: 'left',
		noSort: true
	},
	{
		id: GeneralEmailsTableColumnsTypeEnum.NOTIFICATION_CODE,
		label: `${translation}.NOTIFICATION_CODE`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: GeneralEmailsTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'right'
	}
];
