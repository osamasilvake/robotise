import { Paper, Table } from '@material-ui/core';
import { TableContainer, TablePagination } from '@material-ui/core';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';

import { AppConfigService } from '../../../../services';
import {
	RobotsListTableHeadId,
	RobotsListTableHeadOrder,
	RobotsListTableInterface
} from './RobotsList.interface';
import { robotsListTableStyles } from './RobotsListTable.styles';
import RobotsListTableBody from './RobotsListTableBody';
import RobotsListTableHead from './RobotsListTableHead';
import { columns } from './RobotsListTableHead.list';

const RobotsListTable: FC<RobotsListTableInterface> = (props) => {
	const { content, page, setPage, rowsPerPage, setRowsPerPage } = props;

	const robotsListTableclasses = robotsListTableStyles();

	const [order, setOrder] = useState<RobotsListTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState(columns[columns.length - 1].id);

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
	 * handle page change
	 * @param _event
	 * @param newPage
	 */
	const handlePageChange = (_event: unknown, newPage: number) => {
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
			<TableContainer className={robotsListTableclasses.sTableMaxHeight}>
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
				rowsPerPageOptions={AppConfigService.AppOptions.robots.pageSizes}
				component="div"
				count={content ? content.meta.totalDocs : 0}
				page={page}
				rowsPerPage={rowsPerPage}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};
export default RobotsListTable;
