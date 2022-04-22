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
import { RobotOrdersActiveOrdersInterface } from './RobotOrdersActions.interface';

const RobotOrdersActiveOrders: FC<RobotOrdersActiveOrdersInterface> = (props) => {
	const { activeOrders } = props;
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch<AppDispatch>();
	const orders = useSelector(ordersSelector);

	/**
	 * handle active orders
	 */
	const handleActiveOrders = () => {
		// dispatch: update state
		const state: SOCStateInterface = {
			...orders.content?.state,
			page: 0,
			activeOrders: !activeOrders
		};
		dispatch(OrderUpdateState(state));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="activeOrders"
					checked={activeOrders}
					onChange={handleActiveOrders}
				/>
			}
			label={t<string>('CONTENT.ORDERS.LIST.ACTIONS.FILTERS.ACTIVE_ORDERS')}
		/>
	);
};
export default RobotOrdersActiveOrders;
