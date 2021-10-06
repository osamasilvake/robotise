import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	CLCDataInterface,
	CLContentInterface
} from '../../../../../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { momentSort } from '../../../../../../../utilities/methods/Moment';
import {
	RobotCommandsLogTableColumnsTypeEnum,
	RobotCommandsLogTableSortTypeEnum
} from './RobotCommandsLogTable.enum';
import {
	RobotCommandsLogTableBodyInterface,
	RobotCommandsLogTableColumnInterface
} from './RobotCommandsLogTable.interface';
import { columns } from './RobotCommandsLogTable.list';
import RobotCommandsLogTableBodyCell from './RobotCommandsLogTableBodyCell';

const RobotCommandsLogTableBody: FC<RobotCommandsLogTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: CLContentInterface): CLCDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[3].id:
				type = RobotCommandsLogTableSortTypeEnum.DATE;
				break;
			case columns[0].id:
			case columns[1].id:
				type = RobotCommandsLogTableSortTypeEnum.STRING;
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
		key: RobotCommandsLogTableColumnsTypeEnum,
		type: RobotCommandsLogTableSortTypeEnum
	) => {
		return (a: CLCDataInterface, b: CLCDataInterface) => {
			switch (type) {
				case RobotCommandsLogTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				case RobotCommandsLogTableSortTypeEnum.STRING:
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
					.map((log: CLCDataInterface) => (
						<TableRow key={log.id}>
							{columns.map((column: RobotCommandsLogTableColumnInterface) => (
								<RobotCommandsLogTableBodyCell
									key={column.id}
									column={column}
									log={log}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default RobotCommandsLogTableBody;
