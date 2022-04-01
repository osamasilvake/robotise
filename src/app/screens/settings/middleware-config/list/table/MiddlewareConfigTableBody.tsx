import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	SMCContentInterface,
	SMCDataInterface
} from '../../../../../slices/settings/middleware-config/MiddlewareConfig.interface';
import {
	MiddlewareConfigTableColumnsTypeEnum,
	MiddlewareConfigTableSortTypeEnum
} from './MiddlewareConfigTable.enum';
import {
	MiddlewareConfigTableBodyInterface,
	MiddlewareConfigTableColumnInterface
} from './MiddlewareConfigTable.interface';
import { columns } from './MiddlewareConfigTable.list';
import MiddlewareConfigTableBodyCell from './MiddlewareConfigTableBodyCell';

const MiddlewareConfigTableBody: FC<MiddlewareConfigTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SMCContentInterface): SMCDataInterface[] => {
		let type;
		switch (orderBy) {
			case MiddlewareConfigTableColumnsTypeEnum.KEY:
			case MiddlewareConfigTableColumnsTypeEnum.PROP:
			case MiddlewareConfigTableColumnsTypeEnum.DIRECTION:
			case MiddlewareConfigTableColumnsTypeEnum.STATUS:
				type = MiddlewareConfigTableSortTypeEnum.STRING;
				break;
			case MiddlewareConfigTableColumnsTypeEnum.AUDIT:
			case MiddlewareConfigTableColumnsTypeEnum.DEBUG:
			case MiddlewareConfigTableColumnsTypeEnum.SAVE_HISTORY:
			case MiddlewareConfigTableColumnsTypeEnum.STOP_PROPAGATE:
				type = MiddlewareConfigTableSortTypeEnum.BOOLEAN;
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
		key: MiddlewareConfigTableColumnsTypeEnum,
		type: MiddlewareConfigTableSortTypeEnum
	) => {
		return (a: SMCDataInterface, b: SMCDataInterface) => {
			switch (type) {
				case MiddlewareConfigTableSortTypeEnum.BOOLEAN:
					return a[key] ? -1 : 1;
				case MiddlewareConfigTableSortTypeEnum.STRING:
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
					.map((messageConfig: SMCDataInterface) => (
						<TableRow key={messageConfig.id} tabIndex={-1}>
							{columns.map((column: MiddlewareConfigTableColumnInterface) => (
								<MiddlewareConfigTableBodyCell
									key={column.id}
									messageConfig={messageConfig}
									column={column}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default MiddlewareConfigTableBody;
