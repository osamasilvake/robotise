import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	purchasesSelector,
	PurchaseUpdateState
} from '../../../../../../../slices/purchases/Purchases.slice';
import { SPCState } from '../../../../../../../slices/purchases/Purchases.slice.interface';
import { RobotPurchasesDebugInterface } from './RobotPurchasesActions.interface';
import { RobotPurchasesActionsStyles } from './RobotPurchasesActions.style';

const RobotPurchasesDebug: FC<RobotPurchasesDebugInterface> = (props) => {
	const { debug } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesActionsStyles();

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	/**
	 * toggle debug
	 */
	const toggleDebug = () => {
		// dispatch: update state
		const payload: SPCState = {
			...purchases.content?.state,
			page: 0,
			debug: !debug
		};
		dispatch(PurchaseUpdateState(payload));
	};

	return (
		<Box>
			<FormControlLabel
				className={classes.sDebug}
				control={
					<Checkbox color="primary" name="debug" checked={debug} onChange={toggleDebug} />
				}
				label={t('CONTENT.PURCHASES.LIST.ACTIONS.DEBUG.LABEL')}
			/>
		</Box>
	);
};
export default RobotPurchasesDebug;
