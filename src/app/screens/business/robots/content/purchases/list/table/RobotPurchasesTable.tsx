import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../../services';
import {
	purchasesSelector,
	PurchaseUpdateState
} from '../../../../../../../slices/business/robots/purchases/Purchases.slice';
import { SPCStateInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';
import {
	RobotPurchasesTableHeadOrder,
	RobotPurchasesTableInterface
} from './RobotPurchasesTable.interface';
import { columns } from './RobotPurchasesTable.list';
import { RobotPurchasesTableStyle } from './RobotPurchasesTable.style';
import RobotPurchasesTableBody from './RobotPurchasesTableBody';
import RobotPurchasesTableHead from './RobotPurchasesTableHead';

const RobotPurchasesTable: FC<RobotPurchasesTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = RobotPurchasesTableStyle();

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	const [order, setOrder] = useState<RobotPurchasesTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotPurchasesTableColumnsTypeEnum>(columns[1].id);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: RobotPurchasesTableColumnsTypeEnum
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
		const state: SPCStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(PurchaseUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: SPCStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(PurchaseUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<RobotPurchasesTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<RobotPurchasesTableBody
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
					AppConfigService.AppOptions.screens.business.robots.content.purchases.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.robots.content.purchases.list
								.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: purchases.loading
				})}
			/>
		</Box>
	);
};
export default RobotPurchasesTable;
