import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../../services';
import {
	phoneCallsSelector,
	PhoneCallsUpdateState
} from '../../../../../../../slices/business/sites/phone-calls/PhoneCalls.slice';
import { PCCStateInterface } from '../../../../../../../slices/business/sites/phone-calls/PhoneCalls.slice.interface';
import { SitePhoneCallsTableColumnsTypeEnum } from './SitePhoneCallsTable.enum';
import {
	SitePhoneCallsTableHeadOrder,
	SitePhoneCallsTableInterface
} from './SitePhoneCallsTable.interface';
import { columns } from './SitePhoneCallsTable.list';
import { SitePhoneCallsTableStyle } from './SitePhoneCallsTable.style';
import SitePhoneCallsTableBody from './SitePhoneCallsTableBody';
import SitePhoneCallsTableHead from './SitePhoneCallsTableHead';

const SitePhoneCallsTable: FC<SitePhoneCallsTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = SitePhoneCallsTableStyle();

	const dispatch = useDispatch();
	const phoneCalls = useSelector(phoneCallsSelector);

	const [order, setOrder] = useState<SitePhoneCallsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<SitePhoneCallsTableColumnsTypeEnum>(
		SitePhoneCallsTableColumnsTypeEnum.UPDATED
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: SitePhoneCallsTableColumnsTypeEnum
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
		dispatch(PhoneCallsUpdateState(state));
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
		dispatch(PhoneCallsUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<SitePhoneCallsTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<SitePhoneCallsTableBody
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
					AppConfigService.AppOptions.screens.business.sites.content.phoneCalls.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.sites.content.phoneCalls.list
								.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: phoneCalls.loading
				})}
			/>
		</Box>
	);
};
export default SitePhoneCallsTable;
