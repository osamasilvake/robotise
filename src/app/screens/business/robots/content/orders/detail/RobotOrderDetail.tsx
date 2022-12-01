import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	OrderFetch,
	orderSelector
} from '../../../../../../slices/business/robots/orders/Order.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotOrderHead from './head/RobotOrderHead';
import RobotOrderTable from './table/RobotOrderTable';

const RobotOrderDetail: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const order = useSelector(orderSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const orderId = params.orderId;

	useEffect(() => {
		// dispatch: fetch robot order
		dispatch(OrderFetch(orderId));
	}, [dispatch, orderId]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch robot order
			dispatch(OrderFetch(orderId, true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.robots.content.orders.detail.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, orderId]);

	// loader
	if (order.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (order.errors) {
		return <PageError message={order.errors.text} />;
	}

	// init
	if (!order.init) return null;

	// empty
	if (!order.content?.updatedAt) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return order ? (
		<Box>
			{/* Head */}
			<RobotOrderHead order={order} />

			{/* Table */}
			<RobotOrderTable order={order} />
		</Box>
	) : null;
};
export default RobotOrderDetail;
