import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import { AppDispatch } from '../../../../../slices';
import {
	AllOrdersFetchList,
	allOrdersSelector
} from '../../../../../slices/business/general/all-orders/AllOrders.slice';
import { GeneralAllOrdersListPayloadInterface } from './GeneralAllOrdersList.interface';
import { GeneralAllOrdersListStyle } from './GeneralAllOrdersList.style';
import GeneralAllOrdersTable from './table/GeneralAllOrdersTable';

const GeneralAllOrdersList: FC = () => {
	const classes = GeneralAllOrdersListStyle();

	const dispatch = useDispatch<AppDispatch>();
	const allOrders = useSelector(allOrdersSelector);

	const page = allOrders.content?.state?.page || 0;
	const rowsPerPage =
		allOrders.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.general.allOrders.list.defaultPageSize;
	const activeOrders = !!allOrders.content?.state?.activeOrders;
	const debug = !!allOrders.content?.state?.debug;
	const siteId = allOrders.content?.state?.siteId;

	const pageRef = useRef({
		page: (allOrders.content?.meta?.page || 0) - 1,
		rowsPerPage,
		activeOrders,
		debug
	});

	useEffect(() => {
		const payload: GeneralAllOrdersListPayloadInterface = {
			siteId,
			page,
			rowsPerPage,
			activeOrders,
			debug
		};

		if (pageRef.current.activeOrders !== activeOrders && page === 0) {
			// dispatch: fetch all orders
			dispatch(AllOrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.activeOrders = activeOrders;
		} else if (pageRef.current.debug !== debug && page === 0) {
			// dispatch: fetch all orders
			dispatch(AllOrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.debug = debug;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch all orders
			dispatch(AllOrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = allOrders.content === null;

			const condition2 = pageRef.current.page !== -1; // page switch back and forth
			const condition3 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2) {
				if (condition3) {
					// dispatch: fetch all orders
					dispatch(
						AllOrdersFetchList({
							...payload,
							page: condition2 ? 0 : page,
							activeOrders: condition2 ? false : activeOrders,
							debug: condition2 ? false : debug
						})
					);

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, allOrders.content, siteId, rowsPerPage, page, activeOrders, debug]);

	useEffect(() => {
		const executeServices = () => {
			if (allOrders.content) {
				// dispatch: fetch all orders
				dispatch(
					AllOrdersFetchList(
						{
							siteId,
							page: 0,
							rowsPerPage,
							activeOrders,
							debug
						},
						true
					)
				);
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.general.allOrders.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, allOrders.content, siteId, page, rowsPerPage, activeOrders, debug]);

	// loader
	if (allOrders.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (allOrders.errors) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				{/*<RobotOrdersActions activeOrders={activeOrders} debug={debug} />*/}

				{/* Error */}
				<PageError message={allOrders.errors?.text} />
			</Box>
		);
	}

	// init
	if (!allOrders.init) return null;

	// empty
	if (!allOrders.content?.data.length) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				{/*<RobotOrdersActions activeOrders={activeOrders} debug={debug} />*/}

				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" paddingTop />
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			{/*<RobotOrdersActions activeOrders={activeOrders} debug={debug} />*/}

			{/* Table */}
			<GeneralAllOrdersTable
				content={allOrders.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default GeneralAllOrdersList;
