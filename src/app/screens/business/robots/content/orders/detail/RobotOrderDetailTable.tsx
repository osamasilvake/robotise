import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../components/common/status/Status';
import { SOCDataHistoryInterface } from '../../../../../../slices/orders/Orders.slice.interface';
import { momentFormat2 } from '../../../../../../utilities/methods/Moment';
import { mapStatusLevel } from '../list/table/RobotOrdersTable.map';
import { RobotOrderColumnsTypeEnum } from './RobotOrderDetail.enum';
import {
	RobotOrderDetailInterface,
	RobotOrderTableColumnInterface
} from './RobotOrderDetail.interface';
import { columns } from './RobotOrderDetail.list';

const RobotOrderDetailTable: FC<RobotOrderDetailInterface> = (props) => {
	const { order } = props;
	const { t } = useTranslation('ROBOTS');

	/**
	 * set cell value
	 * @param lane
	 * @param column
	 * @returns
	 */
	const setCellValue = (row: SOCDataHistoryInterface, column: RobotOrderTableColumnInterface) => {
		switch (column.id) {
			case RobotOrderColumnsTypeEnum.DETAILS:
				return (
					<Status level={mapStatusLevel(row.details)}>
						{t(
							`CONTENT.ORDERS.LIST.TABLE.VALUES.STATUS.${row[column.id].replace(
								':',
								'_'
							)}`
						)}
					</Status>
				);
			case RobotOrderColumnsTypeEnum.CREATED_AT:
			default:
				return momentFormat2(row[column.id]);
		}
	};

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((column: RobotOrderTableColumnInterface) => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{
									minWidth: column.minWidth,
									width: column.width
								}}>
								{t(column.label)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{order?.content?.history.map((row) => (
						<TableRow key={row.createdAt}>
							{columns.map((column: RobotOrderTableColumnInterface) => (
								<TableCell key={column.id} align={column.align}>
									{setCellValue(row, column)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default RobotOrderDetailTable;
