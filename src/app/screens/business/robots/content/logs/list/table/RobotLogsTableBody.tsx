import { TableBody, TableRow } from '@material-ui/core';
import { FC } from 'react';

import {
	SLCDataInterface,
	SLContentInterface
} from '../../../../../../../slices/business/robots/logs/Logs.slice.interface';
import { momentSort } from '../../../../../../../utilities/methods/Moment';
import { RobotLogsTableColumnsTypeEnum, RobotLogsTableSortTypeEnum } from './RobotLogsTable.enum';
import {
	RobotLogsTableBodyInterface,
	RobotLogsTableColumnInterface
} from './RobotLogsTable.interface';
import { columns } from './RobotLogsTable.list';
import RobotLogsTableBodyCell from './RobotLogsTableBodyCell';

const RobotLogsTableBody: FC<RobotLogsTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SLContentInterface): SLCDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[3].id:
				type = RobotLogsTableSortTypeEnum.DATE;
				break;
			case columns[0].id:
			case columns[1].id:
				type = RobotLogsTableSortTypeEnum.STRING;
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
		key: RobotLogsTableColumnsTypeEnum,
		type: RobotLogsTableSortTypeEnum
	) => {
		return (a: SLCDataInterface, b: SLCDataInterface) => {
			switch (type) {
				case RobotLogsTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				case RobotLogsTableSortTypeEnum.STRING:
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
					.map((log: SLCDataInterface) => (
						<TableRow key={log.id}>
							{columns.map((column: RobotLogsTableColumnInterface) => (
								<RobotLogsTableBodyCell key={column.id} column={column} log={log} />
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default RobotLogsTableBody;
