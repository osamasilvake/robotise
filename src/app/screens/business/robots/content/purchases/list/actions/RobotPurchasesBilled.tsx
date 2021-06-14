import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	purchasesSelector,
	PurchaseUpdateState
} from '../../../../../../../slices/purchases/Purchases.slice';
import { SPCState } from '../../../../../../../slices/purchases/Purchases.slice.interface';
import { RobotPurchasesBilledInterface } from './RobotPurchasesActions.interface';

const RobotPurchasesBilled: FC<RobotPurchasesBilledInterface> = (props) => {
	const { billed } = props;
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	/**
	 * toggle billed
	 */
	const toggleBilled = () => {
		// dispatch: update state
		const payload: SPCState = {
			...purchases.content?.state,
			page: 0,
			billed: !billed
		};
		dispatch(PurchaseUpdateState(payload));
	};

	return (
		<Box>
			<FormControlLabel
				control={
					<Checkbox
						color="primary"
						name="billed"
						checked={billed}
						onChange={toggleBilled}
					/>
				}
				label={t('CONTENT.PURCHASES.LIST.ACTIONS.BILLED.LABEL')}
			/>
		</Box>
	);
};
export default RobotPurchasesBilled;
