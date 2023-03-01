import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	CLCDataInterface,
	CLContentInterface
} from '../../../../../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { dateSort } from '../../../../../../../utilities/methods/Date';
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
			case RobotCommandsLogTableColumnsTypeEnum.CREATED:
				type = RobotCommandsLogTableSortTypeEnum.DATE;
				break;
			case RobotCommandsLogTableColumnsTypeEnum.COMMAND:
			case RobotCommandsLogTableColumnsTypeEnum.STATUS:
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
			const cond1 = key === RobotCommandsLogTableColumnsTypeEnum.ID;
			if (cond1) return 1;

			const dateA = a[RobotCommandsLogTableColumnsTypeEnum.CREATED];
			const dateB = b[RobotCommandsLogTableColumnsTypeEnum.CREATED];
			switch (type) {
				case RobotCommandsLogTableSortTypeEnum.DATE:
					return dateSort(dateA).diff(dateSort(dateB));
				case RobotCommandsLogTableSortTypeEnum.STRING:
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
					.map((commandLog: CLCDataInterface) => (
						<TableRow key={commandLog.id}>
							{columns.map((column: RobotCommandsLogTableColumnInterface) => (
								<RobotCommandsLogTableBodyCell
									key={column.id}
									column={column}
									commandLog={commandLog}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default RobotCommandsLogTableBody;
