import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../../slices';
import {
	ordersSelector,
	OrderUpdateState
} from '../../../../../../../slices/business/robots/orders/Orders.slice';
import { SOCStateInterface } from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
import { RobotOrdersColdCallsInterface } from './RobotOrdersActions.interface';

const RobotOrdersColdCalls: FC<RobotOrdersColdCallsInterface> = (props) => {
	const { coldCalls } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const orders = useSelector(ordersSelector);

	/**
	 * handle cold calls
	 */
	const handleColdCalls = () => {
		// dispatch: update state
		const state: SOCStateInterface = {
			...orders.content?.state,
			page: 0,
			coldCalls: !coldCalls
		};
		dispatch(OrderUpdateState(state));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="coldCalls"
					checked={coldCalls}
					onChange={handleColdCalls}
				/>
			}
			label={t<string>('COMMON.ORDERS.LIST.ACTIONS.FILTERS.COLD_CALL')}
		/>
	);
};
export default RobotOrdersColdCalls;
