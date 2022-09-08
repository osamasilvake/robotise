import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../components/common/status/Status';
import { SAODataHistoryInterface } from '../../../../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { dateFormat1 } from '../../../../../../utilities/methods/Date';
import { mapStatus } from '../../list/table/GeneralAllOrdersTable.map';
import { GeneralAllOrderTableColumnsTypeEnum } from './GeneralAllOrderTable.enum';
import {
	GeneralAllOrderTableColumnInterface,
	GeneralAllOrderTableInterface
} from './GeneralAllOrderTable.interface';
import { columns } from './GeneralAllOrderTable.list';

const GeneralAllOrderTable: FC<GeneralAllOrderTableInterface> = (props) => {
	const { order } = props;
	const { t } = useTranslation('GENERAL');

	/**
	 * set cell value
	 * @param row
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		row: SAODataHistoryInterface,
		column: GeneralAllOrderTableColumnInterface
	) => {
		switch (column.id) {
			case GeneralAllOrderTableColumnsTypeEnum.DETAILS:
				return (
					<Status level={mapStatus(row.details)}>
						{t(
							`CONTENT.ALL_ORDERS.LIST.TABLE.VALUES.STATUS.${row[column.id].replace(
								':',
								'_'
							)}`
						)}
					</Status>
				);
			case GeneralAllOrderTableColumnsTypeEnum.CREATED:
			default:
				return dateFormat1(row[column.id]);
		}
	};

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((column: GeneralAllOrderTableColumnInterface) => (
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
						<TableRow key={String(row.createdAt)}>
							{columns.map((column: GeneralAllOrderTableColumnInterface) => (
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
export default GeneralAllOrderTable;
