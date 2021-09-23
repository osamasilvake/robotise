import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import { SACStateInterface } from '../../../../../slices/information/alert-codes/AlertCodes.interface';
import {
	alertCodesSelector,
	AlertCodesUpdateState
} from '../../../../../slices/information/alert-codes/AlertCodes.slice';
import { AlertCodesTableColumnsTypeEnum } from './AlertCodesTable.enum';
import { AlertCodesTableHeadOrder, AlertCodesTableInterface } from './AlertCodesTable.interface';
import { columns } from './AlertCodesTable.list';
import { AlertCodesTableStyle } from './AlertCodesTable.style';
import AlertCodesTableBody from './AlertCodesTableBody';
import AlertCodesTableHead from './AlertCodesTableHead';

const AlertCodesTable: FC<AlertCodesTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = AlertCodesTableStyle();

	const dispatch = useDispatch();
	const alertCodes = useSelector(alertCodesSelector);

	const [order, setOrder] = useState<AlertCodesTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<AlertCodesTableColumnsTypeEnum>(
		columns[columns.length - 1].id
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: AlertCodesTableColumnsTypeEnum) => {
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
		const state: SACStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(AlertCodesUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: SACStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(AlertCodesUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<AlertCodesTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<AlertCodesTableBody
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
					AppConfigService.AppOptions.screens.information.alertCodes.list.showPageSizes
						? AppConfigService.AppOptions.screens.information.alertCodes.list.pageSizes
						: []
				}
				count={content?.meta.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: alertCodes.loading
				})}
			/>
		</Box>
	);
};
export default AlertCodesTable;
