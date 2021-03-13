import { Paper, Table } from '@material-ui/core';
import { TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@material-ui/core';
import { FC, useState } from 'react';

import { RobotsSliceResponseAllInterface } from '../../../../slices/robots/Robots.slice.interface';
import { RobotsListTableColumnInterface, RobotsListTableInterface } from './RobotsList.interface';
import { robotsListTableStyles } from './RobotsListTable.styles';
import { columns } from './RobotsListTableColumns.list';
import RobotsListTableHead from './RobotsListTableHead';

const RobotsListTable: FC<RobotsListTableInterface> = (props) => {
	const { content } = props;

	const robotsListTableclasses = robotsListTableStyles();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

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
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
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
					<RobotsListTableHead columns={columns} />

					{/* Body */}
					<TableBody>
						{content
							?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((robot: RobotsSliceResponseAllInterface) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={robot.id}>
										{columns.map((column: RobotsListTableColumnInterface) => {
											const value = robot[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format ? column.format(value) : value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={content ? content.length : 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};
export default RobotsListTable;
