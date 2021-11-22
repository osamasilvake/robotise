import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	purchasesSelector,
	PurchaseUpdateState
} from '../../../../../../../slices/business/robots/purchases/Purchases.slice';
import { SPCStateInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { RobotPurchasesBilledInterface } from './RobotPurchasesActions.interface';

const RobotPurchasesBilled: FC<RobotPurchasesBilledInterface> = (props) => {
	const { billed } = props;
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	/**
	 * handle billed
	 */
	const handleBilled = () => {
		// dispatch: update state
		const state: SPCStateInterface = {
			...purchases.content?.state,
			page: 0,
			billed: !billed
		};
		dispatch(PurchaseUpdateState(state));
	};

	return (
		<Box>
			<FormControlLabel
				control={
					<Checkbox
						color="primary"
						name="billed"
						checked={billed}
						onChange={handleBilled}
					/>
				}
				label={t<string>('CONTENT.PURCHASES.LIST.ACTIONS.FILTERS.BILLED')}
			/>
		</Box>
	);
};
export default RobotPurchasesBilled;
