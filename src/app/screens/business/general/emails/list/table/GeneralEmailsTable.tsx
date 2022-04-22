import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	emailsSelector,
	EmailsUpdateState
} from '../../../../../../slices/business/general/emails/Emails.slice';
import { SECStateInterface } from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { GeneralEmailsTableColumnsTypeEnum } from './GeneralEmailsTable.enum';
import {
	GeneralEmailsTableHeadOrder,
	GeneralEmailsTableInterface
} from './GeneralEmailsTable.interface';
import { columns } from './GeneralEmailsTable.list';
import { GeneralEmailsTableStyle } from './GeneralEmailsTable.style';
import GeneralEmailsTableBody from './GeneralEmailsTableBody';
import GeneralEmailsTableHead from './GeneralEmailsTableHead';

const GeneralEmailsTable: FC<GeneralEmailsTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = GeneralEmailsTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const emails = useSelector(emailsSelector);

	const [order, setOrder] = useState<GeneralEmailsTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<GeneralEmailsTableColumnsTypeEnum>(
		GeneralEmailsTableColumnsTypeEnum.CREATED
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: GeneralEmailsTableColumnsTypeEnum) => {
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
		const state: SECStateInterface = {
			...content?.state,
			page: newPage
		};
		dispatch(EmailsUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: SECStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value
		};
		dispatch(EmailsUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<GeneralEmailsTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<GeneralEmailsTableBody
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
					AppConfigService.AppOptions.screens.business.general.emails.list.showPageSizes
						? AppConfigService.AppOptions.screens.business.general.emails.list.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: emails.loading
				})}
			/>
		</Box>
	);
};
export default GeneralEmailsTable;
