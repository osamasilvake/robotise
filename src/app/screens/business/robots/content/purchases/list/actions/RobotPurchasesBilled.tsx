import { Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	purchasesSelector,
	PurchaseUpdateState
} from '../../../../../../../slices/purchases/Purchases.slice';
import { RobotPurchasesBilledInterface } from './RobotPurchasesActions.interface';
import { RobotPurchasesActionsStyles } from './RobotPurchasesActions.style';

const RobotPurchasesBilled: FC<RobotPurchasesBilledInterface> = (props) => {
	const { setPage } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesActionsStyles();

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	const billed = !!purchases.content?.state?.billed;

	/**
	 * toggle active orders
	 */
	const toggleBilled = () => {
		// dispatch: update state
		const payload = {
			...purchases.content?.state,
			billed: !billed
		};
		dispatch(PurchaseUpdateState(payload));

		// set page
		setPage(0);
	};

	return (
		<FormControlLabel
			className={classes.sBilled}
			control={
				<Checkbox color="primary" name="billed" checked={billed} onChange={toggleBilled} />
			}
			label={t('CONTENT.PURCHASES.LIST.OPTIONS.BILLED.LABEL')}
		/>
	);
};
export default RobotPurchasesBilled;
