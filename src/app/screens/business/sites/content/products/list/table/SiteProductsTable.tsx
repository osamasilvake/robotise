import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../services';
import { SiteProductsTableColumnsTypeEnum } from './SiteProductsTable.enum';
import {
	SiteProductsTableHeadOrder,
	SiteProductsTableInterface
} from './SiteProductsTable.interface';
import { columns } from './SiteProductsTable.list';
import { SiteProductsTableStyle } from './SiteProductsTable.style';
import SiteProductsTableBody from './SiteProductsTableBody';
import SiteProductsTableHead from './SiteProductsTableHead';

const SiteProductsTable: FC<SiteProductsTableInterface> = (props) => {
	const { content } = props;
	const { t } = useTranslation('COMMON');
	const classes = SiteProductsTableStyle();

	const [order, setOrder] = useState<SiteProductsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<SiteProductsTableColumnsTypeEnum>(
		columns[columns.length - 2].id
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: SiteProductsTableColumnsTypeEnum) => {
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
					<SiteProductsTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<SiteProductsTableBody content={content} order={order} orderBy={orderBy} />
				</Table>
			</TableContainer>

			{/* Pagination */}
			<TablePagination
				component="div"
				labelRowsPerPage={t('ROWS_PER_PAGE')}
				rowsPerPageOptions={
					AppConfigService.AppOptions.screens.business.sites.content.products.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.sites.content.products.list
								.pageSizes
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
export default SiteProductsTable;
