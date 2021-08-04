import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
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
	 * toggle debug
	 */
	const toggleDebug = () => {
		// dispatch: update state
		const state: SPCStateInterface = {
			...purchases.content?.state,
			page: 0,
			debug: !debug
		};
		dispatch(PurchaseUpdateState(state));
	};

	return (
		<Box>
			<FormControlLabel
				control={
					<Checkbox color="primary" name="debug" checked={debug} onChange={toggleDebug} />
				}
				label={t('CONTENT.PURCHASES.LIST.ACTIONS.FILTERS.DEBUG')}
			/>
		</Box>
	);
};
export default RobotPurchasesDebug;
