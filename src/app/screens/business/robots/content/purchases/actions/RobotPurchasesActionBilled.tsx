import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { PurchaseFetch } from '../../../../../../slices/business/robots/purchases/Purchase.slice';
import {
	PurchasesFetchList,
	purchasesSelector,
	PurchaseUpdateBillStatus
} from '../../../../../../slices/business/robots/purchases/Purchases.slice';
import { robotTwinsSelector } from '../../../../../../slices/business/robots/RobotTwins.slice';
import { RobotPurchasesActionBilledInterface } from './RobotPurchasesActionBilled.interface';

const RobotPurchasesActionBilled: FC<RobotPurchasesActionBilledInterface> = (props) => {
	const { purchaseId, isBilled, detailPage } = props;
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch<AppDispatch>();
	const robotTwins = useSelector(robotTwinsSelector);
	const purchases = useSelector(purchasesSelector);

	const cRobotId = robotTwins.content?.robot.id;
	const page = purchases.content?.state?.page || 0;
	const rowsPerPage =
		purchases.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.robots.content.purchases.list.defaultPageSize;
	const billed = !!purchases.content?.state?.billed;
	const debug = !!purchases.content?.state?.debug;
	const translation = 'CONTENT.PURCHASES.ACTIONS';

	/**
	 * handle billed
	 */
	const handleBilled = () => {
		// dispatch: update purchase bill status
		dispatch(
			PurchaseUpdateBillStatus(purchaseId, !isBilled, () => {
				if (!cRobotId) return;

				// fetch robot purchase
				dispatch(PurchaseFetch(purchaseId, true));

				// dispatch: fetch robot purchases
				dispatch(PurchasesFetchList(cRobotId, { page, rowsPerPage, billed, debug }, true));
			})
		);
	};

	return (
		<Box onClick={(e) => e.stopPropagation()}>
			<FormControlLabel
				control={
					<Checkbox
						color="primary"
						name="billed"
						checked={isBilled}
						onChange={handleBilled}
					/>
				}
				label={detailPage ? t<string>(`${translation}.BILLED`) : ''}
			/>
		</Box>
	);
};
export default RobotPurchasesActionBilled;
