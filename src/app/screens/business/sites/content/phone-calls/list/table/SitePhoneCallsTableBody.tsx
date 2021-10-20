import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	PCCDataInterface,
	PCContentInterface
} from '../../../../../../../slices/business/sites/phone-calls/PhoneCalls.slice.interface';
import { momentSort } from '../../../../../../../utilities/methods/Moment';
import {
	SitePhoneCallsTableColumnsTypeEnum,
	SitePhoneCallsTableSortTypeEnum
} from './SitePhoneCallsTable.enum';
import {
	SitePhoneCallsTableBodyInterface,
	SitePhoneCallsTableColumnInterface
} from './SitePhoneCallsTable.interface';
import { columns } from './SitePhoneCallsTable.list';
import SitePhoneCallsTableBodyCell from './SitePhoneCallsTableBodyCell';

const SitePhoneCallsTableBody: FC<SitePhoneCallsTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: PCContentInterface): PCCDataInterface[] => {
		let type;
		switch (orderBy) {
			case SitePhoneCallsTableColumnsTypeEnum.UPDATED_AT:
				type = SitePhoneCallsTableSortTypeEnum.DATE;
				break;
			case SitePhoneCallsTableColumnsTypeEnum.ROOM:
			case SitePhoneCallsTableColumnsTypeEnum.MODE:
				type = SitePhoneCallsTableSortTypeEnum.STRING;
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
		key: SitePhoneCallsTableColumnsTypeEnum,
		type: SitePhoneCallsTableSortTypeEnum
	) => {
		return (a: PCCDataInterface, b: PCCDataInterface) => {
			switch (type) {
				case SitePhoneCallsTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				case SitePhoneCallsTableSortTypeEnum.STRING:
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
					.map((phoneCall: PCCDataInterface) => (
						<TableRow key={String(phoneCall.createdAt)}>
							{columns.map((column: SitePhoneCallsTableColumnInterface) => (
								<SitePhoneCallsTableBodyCell
									key={column.id}
									column={column}
									phoneCall={phoneCall}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default SitePhoneCallsTableBody;
