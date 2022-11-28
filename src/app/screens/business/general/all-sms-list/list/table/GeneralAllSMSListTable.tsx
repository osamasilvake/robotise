import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	allSMSListSelector,
	AllSMSListUpdateState
} from '../../../../../../slices/business/general/all-sms-list/AllSMSList.slice';
import { ASLStateInterface } from '../../../../../../slices/business/general/all-sms-list/AllSMSList.slice.interface';
import { GeneralAllSMSListTableColumnsTypeEnum } from './GeneralAllSMSListTable.enum';
import {
	GeneralAllSMSListTableHeadOrder,
	GeneralAllSMSListTableInterface
} from './GeneralAllSMSListTable.interface';
import { columns } from './GeneralAllSMSListTable.list';
import { GeneralAllSMSListTableStyle } from './GeneralAllSMSListTable.style';
import GeneralAllSMSListTableBody from './GeneralAllSMSListTableBody';
import GeneralAllSMSListTableHead from './GeneralAllSMSListTableHead';

const GeneralAllSMSListTable: FC<GeneralAllSMSListTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = GeneralAllSMSListTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const allSMSList = useSelector(allSMSListSelector);

	const [order, setOrder] = useState<GeneralAllSMSListTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<GeneralAllSMSListTableColumnsTypeEnum>(
		GeneralAllSMSListTableColumnsTypeEnum.UPDATED
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: GeneralAllSMSListTableColumnsTypeEnum
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
		const state: ASLStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(AllSMSListUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: ASLStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(AllSMSListUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<GeneralAllSMSListTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<GeneralAllSMSListTableBody
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
					AppConfigService.AppOptions.screens.business.general.allSMSList.list
						.showPageSizes
						? AppConfigService.AppOptions.screens.business.general.allSMSList.list
								.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: allSMSList.loading
				})}
			/>
		</Box>
	);
};
export default GeneralAllSMSListTable;
