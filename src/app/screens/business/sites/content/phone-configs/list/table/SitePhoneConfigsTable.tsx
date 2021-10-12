import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../../services';
import {
	phoneConfigsSelector,
	SitePhoneConfigsUpdateState
} from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice';
import { PCCStateInterface } from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';
import { SitePhoneConfigsTableColumnsTypeEnum } from './SitePhoneConfigsTable.enum';
import {
	SitePhoneConfigsTableHeadOrder,
	SitePhoneConfigsTableInterface
} from './SitePhoneConfigsTable.interface';
import { columns } from './SitePhoneConfigsTable.list';
import { SitePhoneConfigsTableStyle } from './SitePhoneConfigsTable.style';
import SitePhoneConfigsTableBody from './SitePhoneConfigsTableBody';
import SitePhoneConfigsTableHead from './SitePhoneConfigsTableHead';

const SitePhoneConfigsTable: FC<SitePhoneConfigsTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = SitePhoneConfigsTableStyle();

	const dispatch = useDispatch();
	const phoneConfigs = useSelector(phoneConfigsSelector);

	const [order, setOrder] = useState<SitePhoneConfigsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<SitePhoneConfigsTableColumnsTypeEnum>(columns[0].id);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: SitePhoneConfigsTableColumnsTypeEnum
	) => {
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
		// dispatch: update state
		const state: PCCStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(SitePhoneConfigsUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: PCCStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(SitePhoneConfigsUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<SitePhoneConfigsTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<SitePhoneConfigsTableBody
						content={content}
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
					AppConfigService.AppOptions.screens.business.sites.content.phoneConfigs.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.sites.content.phoneConfigs
								.list.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: phoneConfigs.loading
				})}
			/>
		</Box>
	);
};
export default SitePhoneConfigsTable;
