import { Box } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../components/content/page-error/PageError';
import { OrdersFetchList, ordersSelector } from '../../../../../slices/orders/Orders.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import RobotOrdersTable from './list/table/RobotOrdersTable';
import { RobotOrdersStyles } from './RobotOrders.style';

const RobotOrders: FC = () => {
	const classes = RobotOrdersStyles();

	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const orders = useSelector(ordersSelector);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(20);

	const params: RobotParamsInterface = useParams();
	const pRobotId = orders.content?.robot.id;
	const cRobotId = robotTwinsSummary.content?.dataById[params.robot]?.robot.id;

	useEffect(() => {
		const condition1 = robotTwinsSummary.content !== null;
		const condition2 = orders.content === null;
		const condition3 = orders.content !== null && pRobotId && pRobotId !== cRobotId;

		if (condition1 && (condition2 || condition3)) {
			// dispatch: fetch orders
			cRobotId && dispatch(OrdersFetchList(cRobotId));
		}
	}, [dispatch, orders.content, robotTwinsSummary.content, pRobotId, cRobotId]);

	// loader
	if (robotTwinsSummary.loader || orders.loader) {
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
			<RobotOrdersTable
				content={orders.content}
				page={page}
				setPage={setPage}
				rowsPerPage={rowsPerPage}
				setRowsPerPage={setRowsPerPage}
			/>
		</Box>
	);
};
export default RobotOrders;
