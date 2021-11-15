import { Link, TableCell, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ReadMore from '../../../../../../components/common/read-more/ReadMore';
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
		} else if (GeneralEmailsTableColumnsTypeEnum.CONTENT === column.id) {
			return <ReadMore text={String(value)} variant="body2" />;
		} else if (GeneralEmailsTableColumnsTypeEnum.RECIPIENT === column.id) {
			return (
				<Box>
					<Link underline="hover" href={`mailto:${value}`}>
						{value}
					</Link>
					{email.cc && email.cc.length > 0 && (
						<Typography variant="body2" color="textSecondary">
							{email.cc.join(', ')}
						</Typography>
					)}
					{email.bcc && email.bcc.length > 0 && (
						<Typography variant="body2" color="textSecondary">
							{email.bcc.join(', ')}
						</Typography>
					)}
				</Box>
			);
		} else if (GeneralEmailsTableColumnsTypeEnum.FROM === column.id) {
			return (
				<Box>
					<Typography variant="body2">{email.from.name}</Typography>
					<Link underline="hover" href={`mailto:${email.from.email}`}>
						{email.from.email}
					</Link>
				</Box>
			);
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
