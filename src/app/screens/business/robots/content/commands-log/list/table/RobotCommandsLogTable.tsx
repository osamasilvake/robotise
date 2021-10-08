import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../../services';
import {
	commandsLogSelector,
	RobotCommandsLogUpdateState
} from '../../../../../../../slices/business/robots/commands-log/CommandsLog.slice';
import { CLCStateInterface } from '../../../../../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { RobotCommandsLogTableColumnsTypeEnum } from './RobotCommandsLogTable.enum';
import {
	RobotCommandsLogTableHeadOrder,
	RobotCommandsLogTableInterface
} from './RobotCommandsLogTable.interface';
import { columns } from './RobotCommandsLogTable.list';
import { RobotCommandsLogTableStyle } from './RobotCommandsLogTable.style';
import RobotCommandsLogTableBody from './RobotCommandsLogTableBody';
import RobotCommandsLogTableHead from './RobotCommandsLogTableHead';

const RobotCommandsLogTable: FC<RobotCommandsLogTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = RobotCommandsLogTableStyle();

	const dispatch = useDispatch();
	const commandsLog = useSelector(commandsLogSelector);

	const [order, setOrder] = useState<RobotCommandsLogTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotCommandsLogTableColumnsTypeEnum>(
		columns[columns.length - 1].id
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: RobotCommandsLogTableColumnsTypeEnum
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
		const state: CLCStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(RobotCommandsLogUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: CLCStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(RobotCommandsLogUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<RobotCommandsLogTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<RobotCommandsLogTableBody
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
					AppConfigService.AppOptions.screens.business.robots.content.commandsLog.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.robots.content.commandsLog
								.list.pageSizes
						: []
				}
				count={content?.meta.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: commandsLog.loading
				})}
			/>
		</Box>
	);
};
export default RobotCommandsLogTable;
