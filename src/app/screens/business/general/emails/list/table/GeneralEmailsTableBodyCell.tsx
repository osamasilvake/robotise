import { Box, Icon, Link, Stack, TableCell } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { SECDataInterface } from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { dateFormat1 } from '../../../../../../utilities/methods/Date';
import { GeneralEmailsTableColumnsTypeEnum } from './GeneralEmailsTable.enum';
import {
	GeneralEmailsTableBodyCellInterface,
	GeneralEmailsTableColumnInterface
} from './GeneralEmailsTable.interface';
import { mapEmail, mapHistoryEventType, mapStatus } from './GeneralEmailsTable.map';
import { GeneralEmailsTableStyle } from './GeneralEmailsTable.style';

const GeneralEmailsTableBodyCell: FC<GeneralEmailsTableBodyCellInterface> = (props) => {
	const { column, email } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralEmailsTableStyle();

	const sites = useSelector(sitesSelector);

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
			return dateFormat1(String(value));
		} else if (GeneralEmailsTableColumnsTypeEnum.SITE === column.id) {
			return (
				sites.content?.dataById[email.site?.id]?.title ||
				AppConfigService.AppOptions.common.none
			);
		} else if (GeneralEmailsTableColumnsTypeEnum.HISTORY === column.id) {
			const history = email.history;
			const historyMapped = mappedEmail.history;
			return (
				<Box>
					{history.map((item, index) => (
						<Stack
							key={index}
							spacing={0.5}
							direction="row"
							className={classes.sTableHistory}>
							<Icon
								color={mapHistoryEventType(item.event).color}
								className={classes.sTableHistoryIcon}>
								{mapHistoryEventType(item.event).icon}
							</Icon>
							{t(historyMapped[index].event)}
							{item.reason && <>: {item.reason}</>}
						</Stack>
					))}
				</Box>
			);
		} else if (typeof value === 'string') {
			if (GeneralEmailsTableColumnsTypeEnum.RECIPIENT === column.id) {
				const name = value && value.split('@') && value.split('@')[0];
				return (
					<Link
						variant="body2"
						underline="hover"
						href={`mailto:${value}`}
						target="_blank"
						onClick={(e) => e.stopPropagation()}>
						{name}
					</Link>
				);
			} else if (GeneralEmailsTableColumnsTypeEnum.STATUS === column.id) {
				return (
					<Status level={mapStatus(value)} capitalize>
						{t(value)}
					</Status>
				);
			}
			return t(value);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			<>{setCellValue(email, column)}</>
		</TableCell>
	);
};
export default GeneralEmailsTableBodyCell;
