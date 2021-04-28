import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { PurchaseFetch, purchaseSelector } from '../../../../../../slices/purchases/Purchase.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotPurchaseDetailFoot from './foot/RobotPurchaseDetailFoot';
import RobotPurchaseDetailHead from './head/RobotPurchaseDetailHead';
import RobotPurchaseDetailTable from './table/RobotPurchaseDetailTable';

const RobotPurchaseDetail: FC = () => {
	const dispatch = useDispatch();
	const purchase = useSelector(purchaseSelector);

	const params: RobotParamsInterface = useParams();

	useEffect(() => {
		// dispatch: fetch purchase
		dispatch(PurchaseFetch(params.purchase));
	}, [dispatch, params.purchase]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch purchase
			dispatch(PurchaseFetch(params.purchase, true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.robots.content.purchases.content.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, params.purchase]);

	// loader
	if (purchase.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (purchase.errors) {
		return <PageError message={purchase.errors.text} />;
	}

	// empty
	if (!purchase.content) {
		return null;
	}

	return purchase ? (
		<Box>
			<RobotPurchaseDetailHead purchase={purchase} />
			<RobotPurchaseDetailTable purchase={purchase} />
			<RobotPurchaseDetailFoot purchase={purchase} />
		</Box>
	) : null;
};
export default RobotPurchaseDetail;
