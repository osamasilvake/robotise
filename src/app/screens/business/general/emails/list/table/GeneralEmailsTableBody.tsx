import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import {
	SECDataInterface,
	SEContentInterface
} from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { dateSort } from '../../../../../../utilities/methods/Date';
import {
	GeneralEmailsTableColumnHistoryEventTypeEnum,
	GeneralEmailsTableColumnsTypeEnum,
	GeneralEmailsTableSortTypeEnum
} from './GeneralEmailsTable.enum';
import {
	GeneralEmailsTableBodyInterface,
	GeneralEmailsTableColumnInterface
} from './GeneralEmailsTable.interface';
import { columns } from './GeneralEmailsTable.list';
import { GeneralEmailsTableStyle } from './GeneralEmailsTable.style';
import GeneralEmailsTableBodyCell from './GeneralEmailsTableBodyCell';

const GeneralEmailsTableBody: FC<GeneralEmailsTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = GeneralEmailsTableStyle();

	const sites = useSelector(sitesSelector);

	const navigate = useNavigate();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SEContentInterface): SECDataInterface[] => {
		let type;
		switch (orderBy) {
			case GeneralEmailsTableColumnsTypeEnum.CREATED:
				type = GeneralEmailsTableSortTypeEnum.DATE;
				break;
			case GeneralEmailsTableColumnsTypeEnum.RECIPIENT:
			case GeneralEmailsTableColumnsTypeEnum.STATUS:
			case GeneralEmailsTableColumnsTypeEnum.NOTIFICATION_CODE:
				type = GeneralEmailsTableSortTypeEnum.STRING;
				break;
			case GeneralEmailsTableColumnsTypeEnum.SITE:
				type = GeneralEmailsTableSortTypeEnum.STRING_SITE;
				break;
			default:
				return content.data;
		}
		const result = content.data.concat().sort(sortByProperty(orderBy, type));
		return order === 'desc' ? result.reverse() : result;
	};

	/**
	 * handle show email detail
	 * @param email
	 * @returns
	 */
	const handleShowEmailDetail = (email: SECDataInterface) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.EMAILS.DETAIL;
		const link = url.replace(':emailId', email.id);

		// navigate
		navigate(link);
	};

	/**
	 * sort by property
	 * @param key
	 * @param type
	 * @returns
	 */
	const sortByProperty = (
		key: GeneralEmailsTableColumnsTypeEnum,
		type: GeneralEmailsTableSortTypeEnum
	) => {
		return (a: SECDataInterface, b: SECDataInterface) => {
			const siteA = sites.content?.dataById[a.site.id].title;
			const siteB = sites.content?.dataById[b.site.id].title;
			const dateA = a[GeneralEmailsTableColumnsTypeEnum.CREATED];
			const dateB = b[GeneralEmailsTableColumnsTypeEnum.CREATED];
			switch (type) {
				case GeneralEmailsTableSortTypeEnum.DATE:
					return dateSort(dateA).diff(dateSort(dateB));
				case GeneralEmailsTableSortTypeEnum.STRING_SITE:
					return siteA && siteB
						? String(siteA).localeCompare(String(siteB))
						: siteA
						? 1
						: -1;
				case GeneralEmailsTableSortTypeEnum.STRING:
				default:
					return a[key] && b[key]
						? String(a[key]).localeCompare(String(b[key]))
						: a[key]
						? 1
						: -1;
			}
		};
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((email: SECDataInterface) => (
						<TableRow
							hover
							key={email.id}
							tabIndex={-1}
							onClick={handleShowEmailDetail(email)}
							className={clsx({
								[classes.sTableRowDanger]:
									email.status ===
									GeneralEmailsTableColumnHistoryEventTypeEnum.BOUNCE
							})}>
							{columns.map((column: GeneralEmailsTableColumnInterface) => (
								<GeneralEmailsTableBodyCell
									key={column.id}
									column={column}
									email={email}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default GeneralEmailsTableBody;
