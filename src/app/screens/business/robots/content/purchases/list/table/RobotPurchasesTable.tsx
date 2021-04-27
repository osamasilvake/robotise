import { Box, Table, TableContainer, TablePagination } from '@material-ui/core';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AppConfigService } from '../../../../../../../services';
import { PurchaseUpdateState } from '../../../../../../../slices/purchases/Purchases.slice';
import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';
import {
	RobotPurchasesTableHeadOrder,
	RobotPurchasesTableInterface
} from './RobotPurchasesTable.interface';
import { columns } from './RobotPurchasesTable.list';
import { RobotPurchasesTableStyles } from './RobotPurchasesTable.style';
import RobotPurchasesTableBody from './RobotPurchasesTableBody';
import RobotPurchasesTableHead from './RobotPurchasesTableHead';

const RobotPurchasesTable: FC<RobotPurchasesTableInterface> = (props) => {
	const { content, page, setPage, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = RobotPurchasesTableStyles();

	const dispatch = useDispatch();

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
		// set page
		setPage(newPage);
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const payload = {
			...content?.state,
			rowsPerPage: +event.target.value
		};
		dispatch(PurchaseUpdateState(payload));

		// set page
		setPage(0);
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
					AppConfigService.AppOptions.screens.robots.content.purchases.list.showPageSizes
						? AppConfigService.AppOptions.screens.robots.content.purchases.list
								.pageSizes
						: []
				}
				count={content?.meta.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
};
export default RobotPurchasesTable;
