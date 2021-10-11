import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	ECCDataInterface,
	ECContentInterface
} from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { momentSort } from '../../../../../../../utilities/methods/Moment';
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
			case columns[5].id:
				type = RobotElevatorCallsTableSortTypeEnum.DATE;
				break;
			case columns[0].id:
			case columns[1].id:
			case columns[2].id:
			case columns[3].id:
			case columns[4].id:
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
			switch (type) {
				case RobotElevatorCallsTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				case RobotElevatorCallsTableSortTypeEnum.STRING:
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
					.map((elevatorCall: ECCDataInterface, index) => (
						<TableRow key={index}>
							{columns.map((column: RobotElevatorCallsTableColumnInterface) => (
								<RobotElevatorCallsTableBodyCell
									key={column.id}
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
