import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import { SDLStateInterface } from '../../../../../slices/settings/deep-links/DeepLinks.interface';
import {
	deepLinksSelector,
	DeepLinksUpdateState
} from '../../../../../slices/settings/deep-links/DeepLinks.slice';
import { DeepLinkResetTypeEnum, DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';
import { DeepLinksTableHeadOrder, DeepLinksTableInterface } from './DeepLinksTable.interface';
import { columns } from './DeepLinksTable.list';
import { DeepLinksTableStyle } from './DeepLinksTable.style';
import DeepLinksTableBody from './DeepLinksTableBody';
import DeepLinksTableHead from './DeepLinksTableHead';

const DeepLinksTable: FC<DeepLinksTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = DeepLinksTableStyle();

	const dispatch = useDispatch();
	const deepLinks = useSelector(deepLinksSelector);

	const [order, setOrder] = useState<DeepLinksTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<DeepLinksTableColumnsTypeEnum>(
		DeepLinksTableColumnsTypeEnum.CREATED
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (_event: MouseEvent, property: DeepLinksTableColumnsTypeEnum) => {
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
		const state: SDLStateInterface = {
			...content?.state,
			page: newPage,
			reset: DeepLinkResetTypeEnum.NA
		};
		dispatch(DeepLinksUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: SDLStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value,
			reset: DeepLinkResetTypeEnum.NA
		};
		dispatch(DeepLinksUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<DeepLinksTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<DeepLinksTableBody
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
					AppConfigService.AppOptions.screens.settings.deepLinks.list.showPageSizes
						? AppConfigService.AppOptions.screens.settings.deepLinks.list.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: deepLinks.loading
				})}
			/>
		</Box>
	);
};
export default DeepLinksTable;
