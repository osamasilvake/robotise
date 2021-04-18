import { Box, Table, TableContainer, TablePagination } from '@material-ui/core';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../services';
import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableHeadOrder, RobotsTableInterface } from './RobotsTable.interface';
import { columns } from './RobotsTable.list';
import { RobotsListStyles } from './RobotsTable.style';
import RobotsTableBody from './RobotsTableBody';
import RobotsTableHead from './RobotsTableHead';

const RobotsTable: FC<RobotsTableInterface> = (props) => {
	const { content } = props;
	const { t } = useTranslation('COMMON');
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
				component="div"
				labelRowsPerPage={t('ROWS_PER_PAGE')}
				rowsPerPageOptions={
					AppConfigService.AppOptions.screens.robots.list.showPageSizes
						? AppConfigService.AppOptions.screens.robots.list.pageSizes
						: []
				}
				count={content?.data.length || 0}
				page={0}
				onPageChange={() => null}
				rowsPerPage={AppConfigService.AppOptions.screens.robots.list.defaultPageSize}
				onRowsPerPageChange={() => null}
			/>
		</Box>
	);
};
export default RobotsTable;
