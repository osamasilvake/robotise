import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	SECDataInterface,
	SEContentInterface
} from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { momentSort } from '../../../../../../utilities/methods/Moment';
import {
	GeneralEmailsTableColumnsTypeEnum,
	GeneralEmailsTableSortTypeEnum
} from './GeneralEmailsTable.enum';
import {
	GeneralEmailsTableBodyInterface,
	GeneralEmailsTableColumnInterface
} from './GeneralEmailsTable.interface';
import { columns } from './GeneralEmailsTable.list';
import GeneralEmailsTableBodyCell from './GeneralEmailsTableBodyCell';

const GeneralEmailsTableBody: FC<GeneralEmailsTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SEContentInterface): SECDataInterface[] => {
		let type;
		switch (orderBy) {
			case GeneralEmailsTableColumnsTypeEnum.FROM:
				type = GeneralEmailsTableSortTypeEnum.OBJECT_FROM;
				break;
			case GeneralEmailsTableColumnsTypeEnum.CREATED:
				type = GeneralEmailsTableSortTypeEnum.DATE;
				break;
			case GeneralEmailsTableColumnsTypeEnum.RECIPIENT:
			case GeneralEmailsTableColumnsTypeEnum.SUBJECT:
			case GeneralEmailsTableColumnsTypeEnum.CONTENT:
				type = GeneralEmailsTableSortTypeEnum.STRING;
				break;
			default:
				return content.data;
		}
		const result = content.data.concat().sort(sortByProperty(orderBy, type));
		return order === 'desc' ? result.reverse() : result;
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
			switch (type) {
				case GeneralEmailsTableSortTypeEnum.OBJECT_FROM:
					return a.from.name && b.from.name
						? String(a.from.name).localeCompare(String(b.from.name))
						: a.from.name
						? 1
						: -1;
				case GeneralEmailsTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
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
					.map((email: SECDataInterface, index: number) => (
						<TableRow key={index}>
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
