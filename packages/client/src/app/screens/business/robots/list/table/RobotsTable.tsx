import { Box, Table, TableContainer, TablePagination } from '@material-ui/core';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../services';
import {
	RobotsTableHeadId,
	RobotsTableHeadOrder,
	RobotsTableInterface
} from './RobotsTable.interface';
import { columns } from './RobotsTable.list';
import { RobotsListStyles } from './RobotsTable.style';
import RobotsTableBody from './RobotsTableBody';
import RobotsTableHead from './RobotsTableHead';

const RobotsTable: FC<RobotsTableInterface> = (props) => {
	const { content, page, setPage, rowsPerPage, setRowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = RobotsListStyles();

	const [order, setOrder] = useState<RobotsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotsTableHeadId>(columns[columns.length - 1].id);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: RobotsTableHeadId) => {
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
					<RobotsTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<RobotsTableBody
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
					AppConfigService.AppOptions.screens.robots.list.showPageSizes
						? AppConfigService.AppOptions.screens.robots.list.pageSizes
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
		</Box>
	);
};
export default RobotsTable;
