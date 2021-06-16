import { Box } from '@material-ui/core';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { OrdersFetchList, ordersSelector } from '../../../../../../slices/orders/Orders.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../../slices/sites/Sites.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotOrdersActions from './actions/RobotOrdersActions';
import { RobotOrdersListPayloadInterface } from './RobotOrdersList.interface';
import { RobotOrdersListStyle } from './RobotOrdersList.style';
import RobotOrdersTable from './table/RobotOrdersTable';

const RobotOrdersList: FC = () => {
	const classes = RobotOrdersListStyle();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const orders = useSelector(ordersSelector);

	const page = orders.content?.state?.page || 0;
	const rowsPerPage =
		orders.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.robots.content.orders.list.defaultPageSize;
	const activeOrders = !!orders.content?.state?.activeOrders;
	const debug = !!orders.content?.state?.debug;

	const pageRef = useRef({
		page: (orders.content?.meta?.page || 0) - 1,
		rowsPerPage,
		activeOrders,
		debug
	});

	const params: RobotParamsInterface = useParams();
	const pRobotId = orders.content?.state?.robotId;
	const cRobotId = params.robot;

	useEffect(() => {
		const payload: RobotOrdersListPayloadInterface = {
			robotId: cRobotId,
			page,
			rowsPerPage,
			activeOrders,
			debug
		};

		if (pageRef.current.activeOrders !== activeOrders && page === 0) {
			// dispatch: fetch orders
			dispatch(OrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.activeOrders = activeOrders;
		} else if (pageRef.current.debug !== debug && page === 0) {
			// dispatch: fetch orders
			dispatch(OrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.debug = debug;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch orders
			dispatch(OrdersFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = robotTwinsSummary.content !== null;
			const condition2 = orders.content === null;
			const condition3 = !!(orders.content !== null && pRobotId && pRobotId !== cRobotId);

			const condition4 = pageRef.current.page !== -1; // page switch back and forth
			const condition5 = page > pageRef.current.page; // detect next click

			if (condition1) {
				if (condition2 || condition3 || condition4) {
					if (condition3 || condition5) {
						// dispatch: fetch orders
						dispatch(
							OrdersFetchList({
								...payload,
								page: condition3 ? 0 : page,
								activeOrders: condition3 ? false : activeOrders,
								debug: condition3 ? false : debug
							})
						);

						// update ref
						pageRef.current.page = condition3 ? 0 : page;
						pageRef.current.activeOrders = condition3 ? false : activeOrders;
						pageRef.current.debug = condition3 ? false : debug;
					}
				}
			}
		}
	}, [
		dispatch,
		robotTwinsSummary.content,
		orders.content,
		pRobotId,
		cRobotId,
		rowsPerPage,
		page,
		activeOrders,
		debug
	]);

	useEffect(() => {
		const executeServices = () => {
			if (orders.content) {
				// dispatch: fetch orders
				dispatch(
					OrdersFetchList(
						{
							robotId: cRobotId,
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
			AppConfigService.AppOptions.screens.robots.content.orders.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, orders.content, cRobotId, page, rowsPerPage, activeOrders, debug]);

	// loader
	if (sites.loader || robotTwinsSummary.loader || orders.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (sites.errors || robotTwinsSummary.errors || orders.errors) {
		return (
			<PageError
				message={
					sites.errors?.text || robotTwinsSummary.errors?.text || orders.errors?.text
				}
			/>
		);
	}

	// null
	if (!orders.content) {
		return null;
	}

	// empty
	if (!orders.content.data.length) {
		return (
			<Box>
				{/* Actions */}
				<RobotOrdersActions activeOrders={activeOrders} debug={debug} topSpace />

				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" />
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<RobotOrdersActions activeOrders={activeOrders} debug={debug} />

			{/* Table */}
			<RobotOrdersTable content={orders.content} page={page} rowsPerPage={rowsPerPage} />
		</Box>
	);
};
export default RobotOrdersList;
