import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../services';
import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableHeadOrder, RobotsTableInterface } from './RobotsTable.interface';
import { columns } from './RobotsTable.list';
import { RobotsListStyle } from './RobotsTable.style';
import RobotsTableBody from './RobotsTableBody';
import RobotsTableHead from './RobotsTableHead';

const RobotsTable: FC<RobotsTableInterface> = (props) => {
	const { content, hideTableScroll, siteId } = props;
	const { t } = useTranslation('COMMON');
	const classes = RobotsListStyle();

	const [order, setOrder] = useState<RobotsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<RobotsTableColumnsTypeEnum>(
		RobotsTableColumnsTypeEnum.ALERTS
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
			<TableContainer className={clsx({ [classes.sTableMaxHeight]: !hideTableScroll })}>
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
						content={content}
						siteId={siteId}
					/>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<TablePagination
				component="div"
				labelRowsPerPage={t('ROWS_PER_PAGE')}
				rowsPerPageOptions={
					AppConfigService.AppOptions.screens.business.robots.list.showPageSizes
						? AppConfigService.AppOptions.screens.business.robots.list.pageSizes
						: []
				}
				count={content?.data.length || 0}
				page={0}
				onPageChange={() => null}
				rowsPerPage={
					AppConfigService.AppOptions.screens.business.robots.list.defaultPageSize
				}
				onRowsPerPageChange={() => null}
			/>
		</Box>
	);
};
export default RobotsTable;
