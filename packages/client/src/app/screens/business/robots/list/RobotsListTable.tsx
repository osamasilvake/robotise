import { Paper, Table } from '@material-ui/core';
import { TableContainer, TablePagination } from '@material-ui/core';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../services';
import {
	RobotsListTableHeadId,
	RobotsListTableHeadOrder,
	RobotsListTableInterface
} from './RobotsList.interface';
import { columns } from './RobotsList.list';
import { robotsListStyles } from './RobotsList.styles';
import RobotsListTableBody from './RobotsListTableBody';
import RobotsListTableHead from './RobotsListTableHead';

const RobotsListTable: FC<RobotsListTableInterface> = (props) => {
	const { content, page, setPage, rowsPerPage, setRowsPerPage } = props;

	const { t } = useTranslation('COMMON');
	const robotsListClasses = robotsListStyles();

	const [order, setOrder] = useState<RobotsListTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotsListTableHeadId>(columns[columns.length - 1].id);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: RobotsListTableHeadId) => {
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
		// set rows
		setRowsPerPage(+event.target.value);

		// set page: 0
		setPage(0);
	};

	return (
		<Paper elevation={12}>
			<TableContainer className={robotsListClasses.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<RobotsListTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<RobotsListTableBody
						order={order}
						orderBy={orderBy}
						page={page}
						rowsPerPage={rowsPerPage}
						content={content}
					/>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<TablePagination
				rowsPerPageOptions={
					AppConfigService.AppOptions.screens.robots.showPageSizes
						? AppConfigService.AppOptions.screens.robots.pageSizes
						: []
				}
				component="div"
				count={content ? content.meta.totalDocs : 0}
				page={page}
				labelRowsPerPage={t('ROWS_PER_PAGE')}
				rowsPerPage={rowsPerPage}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};
export default RobotsListTable;
