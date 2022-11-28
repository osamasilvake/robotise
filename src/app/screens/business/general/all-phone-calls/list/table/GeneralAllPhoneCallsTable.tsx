import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { AllPhoneCallsUpdateState } from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice';
import { APCStateInterface } from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice.interface';
import { phoneCallsSelector } from '../../../../../../slices/business/sites/phone-calls/PhoneCalls.slice';
import { GeneralAllPhoneCallsTableColumnsTypeEnum } from './GeneralAllPhoneCallsTable.enum';
import {
	GeneralAllPhoneCallsTableHeadOrder,
	GeneralAllPhoneCallsTableInterface
} from './GeneralAllPhoneCallsTable.interface';
import { columns } from './GeneralAllPhoneCallsTable.list';
import { GeneralAllPhoneCallsTableStyle } from './GeneralAllPhoneCallsTable.style';
import GeneralAllPhoneCallsTableBody from './GeneralAllPhoneCallsTableBody';
import GeneralAllPhoneCallsTableHead from './GeneralAllPhoneCallsTableHead';

const GeneralAllPhoneCallsTable: FC<GeneralAllPhoneCallsTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = GeneralAllPhoneCallsTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const phoneCalls = useSelector(phoneCallsSelector);

	const [order, setOrder] = useState<GeneralAllPhoneCallsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<GeneralAllPhoneCallsTableColumnsTypeEnum>(
		GeneralAllPhoneCallsTableColumnsTypeEnum.UPDATED
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: GeneralAllPhoneCallsTableColumnsTypeEnum
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
		const state: APCStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(AllPhoneCallsUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: APCStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(AllPhoneCallsUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<GeneralAllPhoneCallsTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<GeneralAllPhoneCallsTableBody
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
					AppConfigService.AppOptions.screens.business.general.allPhoneCalls.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.general.allPhoneCalls.list
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
export default GeneralAllPhoneCallsTable;
