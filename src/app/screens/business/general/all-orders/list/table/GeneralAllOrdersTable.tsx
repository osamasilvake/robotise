import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	allOrdersSelector,
	AllOrderUpdateState
} from '../../../../../../slices/business/general/all-orders/AllOrders.slice';
import { SAOStateInterface } from '../../../../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { GeneralAllOrdersTableColumnsTypeEnum } from './GeneralAllOrdersTable.enum';
import {
	GeneralAllOrdersTableHeadOrder,
	GeneralAllOrdersTableInterface
} from './GeneralAllOrdersTable.interface';
import { columns } from './GeneralAllOrdersTable.list';
import { GeneralAllOrdersTableStyle } from './GeneralAllOrdersTable.style';
import GeneralAllOrdersTableBody from './GeneralAllOrdersTableBody';
import GeneralAllOrdersTableHead from './GeneralAllOrdersTableHead';

const GeneralAllOrdersTable: FC<GeneralAllOrdersTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = GeneralAllOrdersTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const allOrders = useSelector(allOrdersSelector);

	const [order, setOrder] = useState<GeneralAllOrdersTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<GeneralAllOrdersTableColumnsTypeEnum>(
		GeneralAllOrdersTableColumnsTypeEnum.CREATED
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: GeneralAllOrdersTableColumnsTypeEnum
	) => {
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
		const state: SAOStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(AllOrderUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: SAOStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(AllOrderUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<GeneralAllOrdersTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<GeneralAllOrdersTableBody
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
					AppConfigService.AppOptions.screens.business.general.allOrders.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.general.allOrders.list
								.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: allOrders.loading
				})}
			/>
		</Box>
	);
};
export default GeneralAllOrdersTable;
