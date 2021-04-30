import { Box, Table, TableContainer, TablePagination } from '@material-ui/core';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../../services';
import { ordersSelector, OrderUpdateState } from '../../../../../../../slices/orders/Orders.slice';
import { SOCState } from '../../../../../../../slices/orders/Orders.slice.interface';
import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';
import { RobotOrdersTableHeadOrder, RobotOrdersTableInterface } from './RobotOrdersTable.interface';
import { columns } from './RobotOrdersTable.list';
import { RobotOrdersTableStyles } from './RobotOrdersTable.style';
import RobotOrdersTableBody from './RobotOrdersTableBody';
import RobotOrdersTableHead from './RobotOrdersTableHead';

const RobotOrdersTable: FC<RobotOrdersTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = RobotOrdersTableStyles();

	const dispatch = useDispatch();
	const orders = useSelector(ordersSelector);

	const [order, setOrder] = useState<RobotOrdersTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotOrdersTableColumnsTypeEnum>(
		columns[columns.length - 2].id
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: RobotOrdersTableColumnsTypeEnum) => {
		const isAsc = orderBy === property && order === 'asc';

		// set order
		setOrder(isAsc ? 'desc' : 'asc');

		// set order by
		setOrderBy(property);
	};

	/**
	 * handle change page
	 * @param _event
	 * @param newPage
	 */
	const handleChangePage = (_event: unknown, newPage: number) => {
		// dispatch: update state
		const payload: SOCState = {
			...content?.state,
			page: newPage
		};
		dispatch(OrderUpdateState(payload));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const payload: SOCState = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(OrderUpdateState(payload));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<RobotOrdersTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<RobotOrdersTableBody
						content={content}
						order={order}
						orderBy={orderBy}
						page={page}
						rowsPerPage={rowsPerPage}
					/>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<TablePagination
				component="div"
				labelRowsPerPage={t('ROWS_PER_PAGE')}
				rowsPerPageOptions={
					AppConfigService.AppOptions.screens.robots.content.orders.list.showPageSizes
						? AppConfigService.AppOptions.screens.robots.content.orders.list.pageSizes
						: []
				}
				count={content?.meta.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: orders.loading
				})}
			/>
		</Box>
	);
};
export default RobotOrdersTable;
