import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	OrdersFetchList,
	ordersSelector
} from '../../../../../../slices/business/robots/orders/Orders.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotOrdersActions from './actions/RobotOrdersActions';
import { RobotOrdersListPayloadInterface } from './RobotOrdersList.interface';
import { RobotOrdersListStyle } from './RobotOrdersList.style';
import RobotOrdersTable from './table/RobotOrdersTable';

const RobotOrdersList: FC = () => {
	const classes = RobotOrdersListStyle();

	const dispatch = useDispatch<AppDispatch>();
	const orders = useSelector(ordersSelector);

	const page = orders.content?.state?.page || 0;
	const rowsPerPage =
		orders.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.robots.content.orders.list.defaultPageSize;
	const activeOrders = !!orders.content?.state?.activeOrders;
	const debug = !!orders.content?.state?.debug;
	const marketingRides = !!orders.content?.state?.marketingRides;
	const coldCalls = !!orders.content?.state?.coldCalls;

	const pageRef = useRef({
		page: (orders.content?.meta?.page || 0) - 1,
		rowsPerPage,
		activeOrders,
		debug,
		marketingRides,
		coldCalls
	});

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const pRobotId = orders.content?.state?.pRobotId;
	const cRobotId = params.robotId;

	useEffect(() => {
		const payload: RobotOrdersListPayloadInterface = {
			page,
			rowsPerPage,
			activeOrders,
			debug,
			marketingRides,
			coldCalls
		};

		if (pageRef.current.activeOrders !== activeOrders && page === 0) {
			// dispatch: fetch robot orders
			dispatch(OrdersFetchList(cRobotId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.activeOrders = activeOrders;
		} else if (pageRef.current.debug !== debug && page === 0) {
			// dispatch: fetch robot orders
			dispatch(OrdersFetchList(cRobotId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.debug = debug;
		} else if (pageRef.current.marketingRides !== marketingRides && page === 0) {
			// dispatch: fetch robot orders
			dispatch(OrdersFetchList(cRobotId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.marketingRides = marketingRides;
		} else if (pageRef.current.coldCalls !== coldCalls && page === 0) {
			// dispatch: fetch robot orders
			dispatch(OrdersFetchList(cRobotId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.coldCalls = coldCalls;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch robot orders
			dispatch(OrdersFetchList(cRobotId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = orders.content === null;
			const condition2 = !!(orders.content !== null && pRobotId && pRobotId !== cRobotId);

			const condition3 = pageRef.current.page !== -1; // page switch back and forth
			const condition4 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2 || condition3) {
				if (condition2 || condition4) {
					// dispatch: fetch robot orders
					dispatch(
						OrdersFetchList(cRobotId, {
							...payload,
							page: condition2 ? 0 : page,
							activeOrders: condition2 ? false : activeOrders,
							debug: condition2 ? false : debug,
							marketingRides: condition2 ? false : marketingRides,
							coldCalls: condition2 ? false : coldCalls
						})
					);

					// update ref
					pageRef.current.page = condition2 ? 0 : page;
					pageRef.current.activeOrders = condition2 ? false : activeOrders;
					pageRef.current.debug = condition2 ? false : debug;
					pageRef.current.marketingRides = condition2 ? false : marketingRides;
					pageRef.current.coldCalls = condition2 ? false : coldCalls;
				}
			}
		}
	}, [
		dispatch,
		orders.content,
		pRobotId,
		cRobotId,
		rowsPerPage,
		page,
		activeOrders,
		debug,
		marketingRides,
		coldCalls
	]);

	useEffect(() => {
		const executeServices = () => {
			if (orders.content) {
				// dispatch: fetch robot orders
				dispatch(
					OrdersFetchList(
						cRobotId,
						{
							page: 0,
							rowsPerPage,
							activeOrders,
							marketingRides,
							coldCalls,
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
			AppConfigService.AppOptions.screens.business.robots.content.orders.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [
		dispatch,
		orders.content,
		cRobotId,
		page,
		rowsPerPage,
		activeOrders,
		debug,
		marketingRides,
		coldCalls
	]);

	// loader
	if (orders.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (orders.errors) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				<RobotOrdersActions
					activeOrders={activeOrders}
					debug={debug}
					marketingRides={marketingRides}
					coldCalls={coldCalls}
				/>

				{/* Error */}
				<PageError message={orders.errors?.text} />
			</Box>
		);
	}

	// init
	if (!orders.init) return null;

	// empty
	if (!orders.content?.data.length) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				<RobotOrdersActions
					activeOrders={activeOrders}
					debug={debug}
					marketingRides={marketingRides}
					coldCalls={coldCalls}
				/>

				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" paddingTop />
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<RobotOrdersActions
				activeOrders={activeOrders}
				debug={debug}
				marketingRides={marketingRides}
				coldCalls={coldCalls}
			/>

			{/* Table */}
			<RobotOrdersTable content={orders.content} page={page} rowsPerPage={rowsPerPage} />
		</Box>
	);
};
export default RobotOrdersList;
