import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import {
	OrderFetch,
	orderSelector
} from '../../../../../../slices/business/robots/orders/Order.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotOrderTable from './table/RobotOrderTable';

const RobotOrderDetail: FC = () => {
	const dispatch = useDispatch();
	const order = useSelector(orderSelector);

	const params: RobotParamsInterface = useParams();

	useEffect(() => {
		// dispatch: fetch order
		dispatch(OrderFetch(params.orderId));
	}, [dispatch, params.orderId]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch order
			dispatch(OrderFetch(params.orderId, true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.robots.content.orders.detail.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, params.orderId]);

	// loader
	if (order.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (order.errors) {
		return <PageError message={order.errors.text} />;
	}

	// null
	if (!order.content) {
		return null;
	}

	// empty
	if (!order.content.updatedAt) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return order ? <RobotOrderTable order={order} /> : null;
};
export default RobotOrderDetail;
