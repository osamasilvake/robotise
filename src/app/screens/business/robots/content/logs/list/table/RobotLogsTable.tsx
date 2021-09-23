import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../../services';
import {
	logsSelector,
	LogUpdateState
} from '../../../../../../../slices/business/robots/logs/Logs.slice';
import { SLCStateInterface } from '../../../../../../../slices/business/robots/logs/Logs.slice.interface';
import { RobotLogsTableColumnsTypeEnum } from './RobotLogsTable.enum';
import { RobotLogsTableHeadOrder, RobotLogsTableInterface } from './RobotLogsTable.interface';
import { columns } from './RobotLogsTable.list';
import { RobotLogsTableStyle } from './RobotLogsTable.style';
import RobotLogsTableBody from './RobotLogsTableBody';
import RobotLogsTableHead from './RobotLogsTableHead';

const RobotLogsTable: FC<RobotLogsTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = RobotLogsTableStyle();

	const dispatch = useDispatch();
	const logs = useSelector(logsSelector);

	const [order, setOrder] = useState<RobotLogsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotLogsTableColumnsTypeEnum>(
		columns[columns.length - 1].id
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: RobotLogsTableColumnsTypeEnum) => {
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
		const state: SLCStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(LogUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: SLCStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(LogUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<RobotLogsTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<RobotLogsTableBody
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
					AppConfigService.AppOptions.screens.business.robots.content.logs.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.robots.content.logs.list
								.pageSizes
						: []
				}
				count={content?.meta.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: logs.loading
				})}
			/>
		</Box>
	);
};
export default RobotLogsTable;
