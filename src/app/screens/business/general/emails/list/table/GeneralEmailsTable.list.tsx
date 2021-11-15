import { GeneralEmailsTableColumnsTypeEnum } from './GeneralEmailsTable.enum';
import { GeneralEmailsTableColumnInterface } from './GeneralEmailsTable.interface';

const translation = 'EMAILS.LIST.TABLE.COLUMNS';
export const columns: GeneralEmailsTableColumnInterface[] = [
	{
		id: GeneralEmailsTableColumnsTypeEnum.SUBJECT,
		label: `${translation}.SUBJECT`,
		minWidth: 140,
		align: 'left'
	},
	{
		id: GeneralEmailsTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'right'
	}
];
