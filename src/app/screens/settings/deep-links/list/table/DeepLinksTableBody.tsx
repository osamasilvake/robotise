import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	SDLContentInterface,
	SDLDataInterface
} from '../../../../../slices/settings/deep-links/DeepLinks.interface';
import { momentSort } from '../../../../../utilities/methods/Moment';
import { DeepLinksTableColumnsTypeEnum, DeepLinksTableSortTypeEnum } from './DeepLinksTable.enum';
import {
	DeepLinksTableBodyInterface,
	DeepLinksTableColumnInterface
} from './DeepLinksTable.interface';
import { columns } from './DeepLinksTable.list';
import DeepLinksTableBodyCell from './DeepLinksTableBodyCell';

const DeepLinksTableBody: FC<DeepLinksTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SDLContentInterface): SDLDataInterface[] => {
		let type;
		switch (orderBy) {
			case DeepLinksTableColumnsTypeEnum.UPDATED_AT:
				type = DeepLinksTableSortTypeEnum.DATE;
				break;
			case DeepLinksTableColumnsTypeEnum.NAME:
			case DeepLinksTableColumnsTypeEnum.DESCRIPTION:
			case DeepLinksTableColumnsTypeEnum.KEY:
				type = DeepLinksTableSortTypeEnum.STRING;
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
		key: DeepLinksTableColumnsTypeEnum,
		type: DeepLinksTableSortTypeEnum
	) => {
		return (a: SDLDataInterface, b: SDLDataInterface) => {
			if (key !== DeepLinksTableColumnsTypeEnum.ACTIONS) {
				switch (type) {
					case DeepLinksTableSortTypeEnum.DATE:
						return momentSort(a[key]).diff(momentSort(b[key]));
					case DeepLinksTableSortTypeEnum.STRING:
					default:
						return a[key] && b[key]
							? String(a[key]).localeCompare(String(b[key]))
							: a[key]
							? 1
							: -1;
				}
			}
			return 1;
		};
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((deepLink: SDLDataInterface) => (
						<TableRow key={deepLink.key} tabIndex={-1}>
							{columns.map((column: DeepLinksTableColumnInterface) => (
								<DeepLinksTableBodyCell
									key={column.id}
									deepLink={deepLink}
									column={column}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default DeepLinksTableBody;
