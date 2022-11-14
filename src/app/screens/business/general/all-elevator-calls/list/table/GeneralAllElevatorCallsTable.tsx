import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	allElevatorCallsSelector,
	AllElevatorCallsUpdateState
} from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice';
import { AECStateInterface } from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import { GeneralAllElevatorCallsTableColumnsTypeEnum } from './GeneralAllElevatorCallsTable.enum';
import {
	GeneralAllElevatorCallsTableHeadOrder,
	GeneralAllElevatorCallsTableInterface
} from './GeneralAllElevatorCallsTable.interface';
import { columns } from './GeneralAllElevatorCallsTable.list';
import { GeneralAllElevatorCallsTableStyle } from './GeneralAllElevatorCallsTable.style';
import GeneralAllElevatorCallsTableBody from './GeneralAllElevatorCallsTableBody';
import GeneralAllElevatorCallsTableHead from './GeneralAllElevatorCallsTableHead';

const GeneralAllElevatorCallsTable: FC<GeneralAllElevatorCallsTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = GeneralAllElevatorCallsTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const allElevatorCalls = useSelector(allElevatorCallsSelector);

	const [order, setOrder] = useState<GeneralAllElevatorCallsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<GeneralAllElevatorCallsTableColumnsTypeEnum>(
		GeneralAllElevatorCallsTableColumnsTypeEnum.CREATED
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: GeneralAllElevatorCallsTableColumnsTypeEnum
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
		const state: AECStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(AllElevatorCallsUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: AECStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(AllElevatorCallsUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<GeneralAllElevatorCallsTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<GeneralAllElevatorCallsTableBody
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
					AppConfigService.AppOptions.screens.business.general.allElevatorCalls.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.general.allElevatorCalls.list
								.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: allElevatorCalls.loading
				})}
			/>
		</Box>
	);
};
export default GeneralAllElevatorCallsTable;
