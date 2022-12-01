import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import { AppDispatch } from '../../../../../slices';
import {
	AllOrderFetch,
	allOrderSelector
} from '../../../../../slices/business/general/all-orders/AllOrder.slice';
import { RobotParamsInterface } from '../../../robots/Robot.interface';
import GeneralAllOrderHead from './head/GeneralAllOrderHead';
import GeneralAllOrderTable from './table/GeneralAllOrderTable';

const GeneralAllOrderDetail: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const allOrder = useSelector(allOrderSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const orderId = params.orderId;

	useEffect(() => {
		// dispatch: fetch order
		dispatch(AllOrderFetch(orderId));
	}, [dispatch, orderId]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch order
			dispatch(AllOrderFetch(orderId, true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.general.allOrders.detail.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, orderId]);

	// loader
	if (allOrder.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (allOrder.errors) {
		return <PageError message={allOrder.errors.text} />;
	}

	// init
	if (!allOrder.init) return null;

	// empty
	if (!allOrder.content?.updatedAt) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return allOrder ? (
		<Box>
			{/* Head */}
			<GeneralAllOrderHead order={allOrder} />

			{/* Table */}
			<GeneralAllOrderTable order={allOrder} />
		</Box>
	) : null;
};
export default GeneralAllOrderDetail;
