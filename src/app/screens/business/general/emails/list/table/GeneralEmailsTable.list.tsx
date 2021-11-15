import { GeneralEmailsTableColumnsTypeEnum } from './GeneralEmailsTable.enum';
import { GeneralEmailsTableColumnInterface } from './GeneralEmailsTable.interface';

const translation = 'EMAILS.LIST.TABLE.COLUMNS';
export const columns: GeneralEmailsTableColumnInterface[] = [
	{
		id: GeneralEmailsTableColumnsTypeEnum.RECIPIENT,
		label: `${translation}.RECIPIENT`,
		minWidth: 140,
		align: 'left'
	},
	{
		id: GeneralEmailsTableColumnsTypeEnum.FROM,
		label: `${translation}.FROM`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: GeneralEmailsTableColumnsTypeEnum.SUBJECT,
		label: `${translation}.SUBJECT`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: GeneralEmailsTableColumnsTypeEnum.CONTENT,
		label: `${translation}.CONTENT`,
		minWidth: 300,
		align: 'left'
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
