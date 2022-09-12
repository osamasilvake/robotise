import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppDispatch } from '../../../../../../slices';
import {
	PurchaseFetch,
	purchaseSelector
} from '../../../../../../slices/business/robots/purchases/Purchase.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import RobotPurchaseComment from './comment/RobotPurchaseComment';
import RobotPurchaseEPayment from './epayment/RobotPurchaseEPayment';
import RobotPurchaseHead from './head/RobotPurchaseHead';
import RobotPurchaseTable from './table/RobotPurchaseTable';

const RobotPurchaseDetail: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const purchase = useSelector(purchaseSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	useEffect(() => {
		// dispatch: fetch robot purchase
		dispatch(PurchaseFetch(params.purchaseId));
	}, [dispatch, params.purchaseId]);

	// loader
	if (purchase.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (purchase.errors) {
		return <PageError message={purchase.errors.text} />;
	}

	// init
	if (!purchase.init) return null;

	// empty
	if (!purchase.content?.updatedAt) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return purchase ? (
		<Box>
			{/* Head */}
			<RobotPurchaseHead purchase={purchase} />

			{/* Table */}
			<RobotPurchaseTable purchase={purchase} />

			{/* EPayment */}
			<RobotPurchaseEPayment purchase={purchase} />

			{/* Comment */}
			<RobotPurchaseComment purchase={purchase} />
		</Box>
	) : null;
};
export default RobotPurchaseDetail;
