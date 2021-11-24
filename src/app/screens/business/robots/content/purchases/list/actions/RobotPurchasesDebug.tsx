import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	purchasesSelector,
	PurchaseUpdateState
} from '../../../../../../../slices/business/robots/purchases/Purchases.slice';
import { SPCStateInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { RobotPurchasesDebugInterface } from './RobotPurchasesActions.interface';

const RobotPurchasesDebug: FC<RobotPurchasesDebugInterface> = (props) => {
	const { debug } = props;
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	/**
	 * handle debug
	 */
	const handleDebug = () => {
		// dispatch: update state
		const state: SPCStateInterface = {
			...purchases.content?.state,
			page: 0,
			debug: !debug
		};
		dispatch(PurchaseUpdateState(state));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox color="primary" name="debug" checked={debug} onChange={handleDebug} />
			}
			label={t<string>('CONTENT.PURCHASES.LIST.ACTIONS.FILTERS.DEBUG')}
		/>
	);
};
export default RobotPurchasesDebug;
