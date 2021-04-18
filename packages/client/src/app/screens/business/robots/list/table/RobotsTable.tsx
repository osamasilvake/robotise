import { Box, Table, TableContainer, TablePagination } from '@material-ui/core';
import { FC, MouseEvent, useState } from 'react';

import { AppConfigService } from '../../../../../services';
import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableHeadOrder, RobotsTableInterface } from './RobotsTable.interface';
import { columns } from './RobotsTable.list';
import { RobotsListStyles } from './RobotsTable.style';
import RobotsTableBody from './RobotsTableBody';
import RobotsTableHead from './RobotsTableHead';

const RobotsTable: FC<RobotsTableInterface> = (props) => {
	const { content } = props;
	const classes = RobotsListStyles();

	const [order, setOrder] = useState<RobotsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotsTableColumnsTypeEnum>(
		columns[columns.length - 1].id
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: RobotsTableColumnsTypeEnum) => {
		const isAsc = orderBy === property && order === 'asc';

		// set order
		setOrder(isAsc ? 'desc' : 'asc');

		// set order by
		setOrderBy(property);
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
					<RobotsTableBody order={order} orderBy={orderBy} content={content} />
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
				page={0}
				rowsPerPage={AppConfigService.AppOptions.screens.robots.list.defaultPageSize}
				onPageChange={() => null}
				onRowsPerPageChange={() => null}
			/>
		</Box>
	);
};
export default RobotsTable;
