import { TableCell } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SECDataInterface } from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { GeneralEmailsTableColumnsTypeEnum } from './GeneralEmailsTable.enum';
import {
	GeneralEmailsTableBodyCellInterface,
	GeneralEmailsTableColumnInterface
} from './GeneralEmailsTable.interface';
import { mapEmail } from './GeneralEmailsTable.map';

const GeneralEmailsTableBodyCell: FC<GeneralEmailsTableBodyCellInterface> = (props) => {
	const { column, email } = props;
	const { t } = useTranslation('GENERAL');

	/**
	 * set cell value
	 * @param email
	 * @param column
	 * @returns
	 */
	const setCellValue = (email: SECDataInterface, column: GeneralEmailsTableColumnInterface) => {
		const mappedEmail = mapEmail(email);
		const value = mappedEmail[column.id];
		if (GeneralEmailsTableColumnsTypeEnum.CREATED === column.id) {
			return momentFormat1(value);
		} else if (typeof value === 'string') {
			return t(value);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(email, column)}
		</TableCell>
	);
};
export default GeneralEmailsTableBodyCell;
