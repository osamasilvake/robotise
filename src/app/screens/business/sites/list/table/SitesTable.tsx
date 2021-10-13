import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../services';
import { SitesTableColumnsTypeEnum } from './SitesTable.enum';
import { SitesTableHeadOrder, SitesTableInterface } from './SitesTable.interface';
import { columns } from './SitesTable.list';
import { SitesListStyle } from './SitesTable.style';
import SitesTableBody from './SitesTableBody';
import SitesTableHead from './SitesTableHead';

const SitesTable: FC<SitesTableInterface> = (props) => {
	const { content } = props;
	const { t } = useTranslation('COMMON');
	const classes = SitesListStyle();

	const [order, setOrder] = useState<SitesTableHeadOrder>('asc');
	const [orderBy, setOrderBy] = useState<SitesTableColumnsTypeEnum>(
		SitesTableColumnsTypeEnum.SITE_TITLE
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: SitesTableColumnsTypeEnum) => {
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
					<SitesTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<SitesTableBody order={order} orderBy={orderBy} content={content} />
				</Table>
			</TableContainer>

			{/* Pagination */}
			<TablePagination
				component="div"
				labelRowsPerPage={t('ROWS_PER_PAGE')}
				rowsPerPageOptions={
					AppConfigService.AppOptions.screens.business.sites.list.showPageSizes
						? AppConfigService.AppOptions.screens.business.sites.list.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={0}
				onPageChange={() => null}
				rowsPerPage={
					AppConfigService.AppOptions.screens.business.sites.list.defaultPageSize
				}
				onRowsPerPageChange={() => null}
			/>
		</Box>
	);
};
export default SitesTable;
