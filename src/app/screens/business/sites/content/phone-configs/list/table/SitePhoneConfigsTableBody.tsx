import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	PCCDataInterface,
	PCContentInterface
} from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';
import {
	SitePhoneConfigsTableColumnsTypeEnum,
	SitePhoneConfigsTableSortTypeEnum
} from './SitePhoneConfigsTable.enum';
import {
	SitePhoneConfigsTableBodyInterface,
	SitePhoneConfigsTableColumnInterface
} from './SitePhoneConfigsTable.interface';
import { columns } from './SitePhoneConfigsTable.list';
import SitePhoneConfigsTableBodyCell from './SitePhoneConfigsTableBodyCell';

const SitePhoneConfigsTableBody: FC<SitePhoneConfigsTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: PCContentInterface): PCCDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[1].id:
				type = SitePhoneConfigsTableSortTypeEnum.ARRAY_STRING;
				break;
			case columns[0].id:
			case columns[2].id:
			case columns[3].id:
			case columns[4].id:
			case columns[6].id:
				type = SitePhoneConfigsTableSortTypeEnum.STRING;
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
		key: SitePhoneConfigsTableColumnsTypeEnum,
		type: SitePhoneConfigsTableSortTypeEnum
	) => {
		return (a: PCCDataInterface, b: PCCDataInterface) => {
			switch (type) {
				case SitePhoneConfigsTableSortTypeEnum.STRING:
				default:
					return String(a[key]).localeCompare(String(b[key]));
			}
		};
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((phoneConfig: PCCDataInterface, index) => (
						<TableRow key={index}>
							{columns.map((column: SitePhoneConfigsTableColumnInterface) => (
								<SitePhoneConfigsTableBodyCell
									key={column.id}
									column={column}
									phoneConfig={phoneConfig}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default SitePhoneConfigsTableBody;
