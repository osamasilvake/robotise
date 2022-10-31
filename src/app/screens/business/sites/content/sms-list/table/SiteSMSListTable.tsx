import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	smsListSelector,
	SMSListUpdateState
} from '../../../../../../slices/business/sites/sms-list/SMSList.slice';
import { SLCStateInterface } from '../../../../../../slices/business/sites/sms-list/SMSList.slice.interface';
import { SiteSMSListTableColumnsTypeEnum } from './SiteSMSListTable.enum';
import { SiteSMSListTableHeadOrder, SiteSMSListTableInterface } from './SiteSMSListTable.interface';
import { columns } from './SiteSMSListTable.list';
import { SiteSMSListTableStyle } from './SiteSMSListTable.style';
import SiteSMSListTableBody from './SiteSMSListTableBody';
import SiteSMSListTableHead from './SiteSMSListTableHead';

const SiteSMSListTable: FC<SiteSMSListTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = SiteSMSListTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const smsList = useSelector(smsListSelector);

	const [order, setOrder] = useState<SiteSMSListTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<SiteSMSListTableColumnsTypeEnum>(
		SiteSMSListTableColumnsTypeEnum.UPDATED
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: SiteSMSListTableColumnsTypeEnum) => {
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
		const state: SLCStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(SMSListUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: SLCStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(SMSListUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<SiteSMSListTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<SiteSMSListTableBody
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
					AppConfigService.AppOptions.screens.business.sites.content.smsList.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.sites.content.smsList.list
								.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: smsList.loading
				})}
			/>
		</Box>
	);
};
export default SiteSMSListTable;
