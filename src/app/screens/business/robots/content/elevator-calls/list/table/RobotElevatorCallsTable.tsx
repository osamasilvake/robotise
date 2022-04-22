import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../../services';
import { AppDispatch } from '../../../../../../../slices';
import {
	elevatorCallsSelector,
	ElevatorCallsUpdateState
} from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice';
import { ECCStateInterface } from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { RobotElevatorCallsTableColumnsTypeEnum } from './RobotElevatorCallsTable.enum';
import {
	RobotElevatorCallsTableHeadOrder,
	RobotElevatorCallsTableInterface
} from './RobotElevatorCallsTable.interface';
import { columns } from './RobotElevatorCallsTable.list';
import { RobotElevatorCallsTableStyle } from './RobotElevatorCallsTable.style';
import RobotElevatorCallsTableBody from './RobotElevatorCallsTableBody';
import RobotElevatorCallsTableHead from './RobotElevatorCallsTableHead';

const RobotElevatorCallsTable: FC<RobotElevatorCallsTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = RobotElevatorCallsTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const elevatorCalls = useSelector(elevatorCallsSelector);

	const [order, setOrder] = useState<RobotElevatorCallsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotElevatorCallsTableColumnsTypeEnum>(
		RobotElevatorCallsTableColumnsTypeEnum.CREATED
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: RobotElevatorCallsTableColumnsTypeEnum
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
		const state: ECCStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(ElevatorCallsUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: ECCStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(ElevatorCallsUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<RobotElevatorCallsTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<RobotElevatorCallsTableBody
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
					AppConfigService.AppOptions.screens.business.robots.content.elevatorCalls.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.robots.content.elevatorCalls
								.list.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: elevatorCalls.loading
				})}
			/>
		</Box>
	);
};
export default RobotElevatorCallsTable;
