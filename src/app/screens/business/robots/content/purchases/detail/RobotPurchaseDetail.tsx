import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { PurchaseFetch, purchaseSelector } from '../../../../../../slices/purchases/Purchase.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotPurchaseFoot from './foot/RobotPurchaseFoot';
import RobotPurchaseHead from './head/RobotPurchaseHead';
import RobotPurchaseTable from './table/RobotPurchaseTable';

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
			AppConfigService.AppOptions.screens.robots.content.purchases.detail.refreshTime
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

	// null
	if (!purchase.content) {
		return null;
	}

	// empty
	if (!purchase.content.updatedAt) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return purchase ? (
		<Box>
			<RobotPurchaseHead purchase={purchase} />
			<RobotPurchaseTable purchase={purchase} />
			<RobotPurchaseFoot purchase={purchase} />
		</Box>
	) : null;
};
export default RobotPurchaseDetail;
