import { Box } from '@material-ui/core';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import { OrdersFetchList, ordersSelector } from '../../../../../slices/orders/Orders.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import RobotOrdersActions from './list/actions/RobotOrdersActions';
import RobotOrdersTable from './list/table/RobotOrdersTable';
import { RobotOrdersStyles } from './RobotOrders.style';

const RobotOrders: FC = () => {
	const classes = RobotOrdersStyles();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const orders = useSelector(ordersSelector);

	const [page, setPage] = useState(0);

	const rowsPerPage =
		orders.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.robots.content.orders.list.defaultPageSize;
	const activeOrders = !!orders.content?.state?.activeOrders;
	const pageRef = useRef({
		page: (orders.content?.meta.page || page) - 1,
		rowsPerPage,
		activeOrders
	});

	const params: RobotParamsInterface = useParams();
	const pRobotId = orders.content?.state?.robotId;
	const cRobotId = robotTwinsSummary.content?.dataById[params.robot]?.robot.id;

	useEffect(() => {
		if (pageRef.current.activeOrders !== activeOrders && page === 0) {
			// dispatch: fetch orders
			cRobotId && dispatch(OrdersFetchList(cRobotId, 1, rowsPerPage, activeOrders));

			// update ref
			pageRef.current.page = 0;
			pageRef.current.activeOrders = activeOrders;
		} else if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch orders
			cRobotId && dispatch(OrdersFetchList(cRobotId, page + 1, rowsPerPage, activeOrders));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = robotTwinsSummary.content !== null;
			const condition2 = orders.content === null;
			const condition3 = orders.content !== null && pRobotId && pRobotId !== cRobotId;
			const condition4 = pageRef.current.page !== -1; // page switch back and forth
			const condition5 = page > pageRef.current.page; // detect next click

			if (condition1) {
				if (condition2 || condition3 || condition4) {
					if (condition3 || condition5) {
						// dispatch: fetch orders
						cRobotId &&
							dispatch(
								OrdersFetchList(cRobotId, page + 1, rowsPerPage, activeOrders)
							);

						// update ref
						pageRef.current.page = page;
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
		activeOrders
	]);

	// loader
	if (sites.loader || robotTwinsSummary.loader || orders.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (orders.errors) {
		return <PageError message={orders.errors.text} />;
	}

	// empty
	if (!orders.content) {
		return null;
	}

	return (
		<Box className={classes.sBox}>
			{/* Options */}
			<RobotOrdersActions setPage={setPage} />

			{/* Table */}
			<RobotOrdersTable
				content={orders.content}
				page={page}
				setPage={setPage}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default RobotOrders;
