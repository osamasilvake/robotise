import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { OrderFetch, orderSelector } from '../../../../../../slices/orders/Order.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotOrderDetailTable from './RobotOrderDetailTable';

const RobotOrderDetail: FC = () => {
	const dispatch = useDispatch();
	const order = useSelector(orderSelector);

	const params: RobotParamsInterface = useParams();

	useEffect(() => {
		// dispatch: fetch order
		dispatch(OrderFetch(params.order));
	}, [dispatch, params.order]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch order
			dispatch(OrderFetch(params.order, true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.robots.content.orders.content.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, params.order]);

	// loader
	if (order.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (order.errors) {
		return <PageError message={order.errors.text} />;
	}

	// empty
	if (!order.content) {
		return null;
	}

	return order ? <RobotOrderDetailTable order={order} /> : null;
};
export default RobotOrderDetail;
