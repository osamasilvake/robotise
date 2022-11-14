import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import {
	AECContentInterface,
	AECDataInterface
} from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import { dateSort } from '../../../../../../utilities/methods/Date';
import {
	GeneralAllElevatorCallsTableColumnsTypeEnum,
	GeneralAllElevatorCallsTableSortTypeEnum
} from './GeneralAllElevatorCallsTable.enum';
import {
	GeneralAllElevatorCallsTableBodyInterface,
	GeneralAllElevatorCallsTableColumnInterface
} from './GeneralAllElevatorCallsTable.interface';
import { columns } from './GeneralAllElevatorCallsTable.list';
import { GeneralAllElevatorCallsTableStyle } from './GeneralAllElevatorCallsTable.style';
import GeneralAllElevatorCallsTableBodyCell from './GeneralAllElevatorCallsTableBodyCell';

const GeneralAllElevatorCallsTableBody: FC<GeneralAllElevatorCallsTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = GeneralAllElevatorCallsTableStyle();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: AECContentInterface): AECDataInterface[] => {
		let type;
		switch (orderBy) {
			case GeneralAllElevatorCallsTableColumnsTypeEnum.CREATED:
				type = GeneralAllElevatorCallsTableSortTypeEnum.DATE;
				break;
			case GeneralAllElevatorCallsTableColumnsTypeEnum.SITE_ROBOT:
			case GeneralAllElevatorCallsTableColumnsTypeEnum.API_STATUS:
			case GeneralAllElevatorCallsTableColumnsTypeEnum.E2E_STATUS:
			case GeneralAllElevatorCallsTableColumnsTypeEnum.CALL_TYPE:
			case GeneralAllElevatorCallsTableColumnsTypeEnum.SRC_AREA_ID:
			case GeneralAllElevatorCallsTableColumnsTypeEnum.DST_AREA_ID:
				type = GeneralAllElevatorCallsTableSortTypeEnum.STRING;
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
		key: GeneralAllElevatorCallsTableColumnsTypeEnum,
		type: GeneralAllElevatorCallsTableSortTypeEnum
	) => {
		return (a: AECDataInterface, b: AECDataInterface) => {
			const siteRobot = key !== GeneralAllElevatorCallsTableColumnsTypeEnum.SITE_ROBOT;
			const logs = key !== GeneralAllElevatorCallsTableColumnsTypeEnum.ELEVATOR_LOGS;
			if (siteRobot && logs) {
				const dateA = a[GeneralAllElevatorCallsTableColumnsTypeEnum.CREATED];
				const dateB = b[GeneralAllElevatorCallsTableColumnsTypeEnum.CREATED];
				switch (type) {
					case GeneralAllElevatorCallsTableSortTypeEnum.DATE:
						return dateSort(dateA).diff(dateSort(dateB));
					case GeneralAllElevatorCallsTableSortTypeEnum.STRING:
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
					.map((elevatorCall: AECDataInterface, index: number) => (
						<TableRow
							key={index}
							className={clsx({
								[classes.sTableRowWarning]: !!elevatorCall?.isDebug
							})}>
							{columns.map((column: GeneralAllElevatorCallsTableColumnInterface) => (
								<GeneralAllElevatorCallsTableBodyCell
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
export default GeneralAllElevatorCallsTableBody;
