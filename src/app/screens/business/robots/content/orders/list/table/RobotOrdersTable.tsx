import { Box, Table, TableContainer, TablePagination } from '@material-ui/core';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../services';
import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';
import { RobotOrdersTableHeadOrder, RobotOrdersTableInterface } from './RobotOrdersTable.interface';
import { columns } from './RobotOrdersTable.list';
import { RobotOrdersTableStyles } from './RobotOrdersTable.style';
import RobotOrdersTableBody from './RobotOrdersTableBody';
import RobotOrdersTableHead from './RobotOrdersTableHead';

const RobotOrdersTable: FC<RobotOrdersTableInterface> = (props) => {
	const { content, executing, page, setPage, rowsPerPage, setRowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = RobotOrdersTableStyles();

	const [order, setOrder] = useState<RobotOrdersTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotOrdersTableColumnsTypeEnum>(
		columns[columns.length - 3].id
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: RobotOrdersTableColumnsTypeEnum) => {
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
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<RobotOrdersTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<RobotOrdersTableBody
						content={content}
						executing={executing}
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
					AppConfigService.AppOptions.screens.robots.content.orders.list.showPageSizes
						? AppConfigService.AppOptions.screens.robots.content.orders.list.pageSizes
						: []
				}
				count={content ? content.meta.totalDocs : 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
};
export default RobotOrdersTable;
