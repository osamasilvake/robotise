import { Box, Table, TableContainer, TablePagination } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import { AppDispatch } from '../../../../../slices';
import { SMCStateInterface } from '../../../../../slices/settings/middleware-config/MiddlewareConfig.interface';
import {
	middlewareConfigSelector,
	MiddlewareConfigUpdateState
} from '../../../../../slices/settings/middleware-config/MiddlewareConfig.slice';
import {
	MiddlewareConfigResetTypeEnum,
	MiddlewareConfigTableColumnsTypeEnum
} from './MiddlewareConfigTable.enum';
import {
	MiddlewareConfigTableHeadOrder,
	MiddlewareConfigTableInterface
} from './MiddlewareConfigTable.interface';
import { columns } from './MiddlewareConfigTable.list';
import { MiddlewareConfigTableStyle } from './MiddlewareConfigTable.style';
import MiddlewareConfigTableBody from './MiddlewareConfigTableBody';
import MiddlewareConfigTableHead from './MiddlewareConfigTableHead';

const MiddlewareConfigTable: FC<MiddlewareConfigTableInterface> = (props) => {
	const { content, page, rowsPerPage } = props;
	const { t } = useTranslation('COMMON');
	const classes = MiddlewareConfigTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const middlewareConfig = useSelector(middlewareConfigSelector);

	const [order, setOrder] = useState<MiddlewareConfigTableHeadOrder>('desc');
	const [orderBy, setOrderBy] = useState<MiddlewareConfigTableColumnsTypeEnum>(
		MiddlewareConfigTableColumnsTypeEnum.CREATED_AT
	);

	/**
	 * handle sort request
	 * @param _event
	 * @param property
	 */
	const handleRequestSort = (
		_event: MouseEvent,
		property: MiddlewareConfigTableColumnsTypeEnum
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
		const state: SMCStateInterface = {
			...content?.state,
			page: newPage,
			reset: MiddlewareConfigResetTypeEnum.NA
		};
		dispatch(MiddlewareConfigUpdateState(state));
	};

	/**
	 * handle change rows per page
	 * @param event
	 */
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		// dispatch: update state
		const state: SMCStateInterface = {
			...content?.state,
			page: 0,
			rowsPerPage: +event.target.value,
			reset: MiddlewareConfigResetTypeEnum.NA
		};
		dispatch(MiddlewareConfigUpdateState(state));
	};

	return (
		<Box>
			<TableContainer className={classes.sTableMaxHeight}>
				<Table stickyHeader>
					{/* Head */}
					<MiddlewareConfigTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						columns={columns}
					/>

					{/* Body */}
					<MiddlewareConfigTableBody
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
					AppConfigService.AppOptions.screens.settings.middlewareConfig.list.showPageSizes
						? AppConfigService.AppOptions.screens.settings.middlewareConfig.list
								.pageSizes
						: []
				}
				count={content?.meta?.totalDocs || 0}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={clsx({
					[classes.sTablePagination]: middlewareConfig.loading
				})}
			/>
		</Box>
	);
};
export default MiddlewareConfigTable;
