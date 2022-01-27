import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	ECCDataInterface,
	ECContentInterface
} from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { dateSort } from '../../../../../../../utilities/methods/Date';
import {
	RobotElevatorCallsTableColumnsTypeEnum,
	RobotElevatorCallsTableSortTypeEnum
} from './RobotElevatorCallsTable.enum';
import {
	RobotElevatorCallsTableBodyInterface,
	RobotElevatorCallsTableColumnInterface
} from './RobotElevatorCallsTable.interface';
import { columns } from './RobotElevatorCallsTable.list';
import RobotElevatorCallsTableBodyCell from './RobotElevatorCallsTableBodyCell';

const RobotElevatorCallsTableBody: FC<RobotElevatorCallsTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: ECContentInterface): ECCDataInterface[] => {
		let type;
		switch (orderBy) {
			case RobotElevatorCallsTableColumnsTypeEnum.CREATED:
				type = RobotElevatorCallsTableSortTypeEnum.DATE;
				break;
			case RobotElevatorCallsTableColumnsTypeEnum.STATUS:
			case RobotElevatorCallsTableColumnsTypeEnum.CALL_TYPE:
			case RobotElevatorCallsTableColumnsTypeEnum.SRC_AREA_ID:
			case RobotElevatorCallsTableColumnsTypeEnum.DST_AREA_ID:
				type = RobotElevatorCallsTableSortTypeEnum.STRING;
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
		key: RobotElevatorCallsTableColumnsTypeEnum,
		type: RobotElevatorCallsTableSortTypeEnum
	) => {
		return (a: ECCDataInterface, b: ECCDataInterface) => {
			if (key !== RobotElevatorCallsTableColumnsTypeEnum.ELEVATOR_LOGS) {
				const dateA = a[RobotElevatorCallsTableColumnsTypeEnum.CREATED];
				const dateB = b[RobotElevatorCallsTableColumnsTypeEnum.CREATED];
				switch (type) {
					case RobotElevatorCallsTableSortTypeEnum.DATE:
						return dateSort(dateA).diff(dateSort(dateB));
					case RobotElevatorCallsTableSortTypeEnum.STRING:
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
					.map((elevatorCall: ECCDataInterface, index: number) => (
						<TableRow key={index}>
							{columns.map((column: RobotElevatorCallsTableColumnInterface) => (
								<RobotElevatorCallsTableBodyCell
									key={column.id}
									index={index}
									column={column}
									elevatorCall={elevatorCall}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default RobotElevatorCallsTableBody;
