import { Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ordersSelector, OrderUpdateState } from '../../../../../../../slices/orders/Orders.slice';
import { SOCState } from '../../../../../../../slices/orders/Orders.slice.interface';
import { RobotOrdersActiveOrdersInterface } from './RobotOrdersActions.interface';
import { RobotOrdersActionsStyles } from './RobotOrdersActions.style';

const RobotOrdersActiveOrders: FC<RobotOrdersActiveOrdersInterface> = (props) => {
	const { activeOrders } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersActionsStyles();

	const dispatch = useDispatch();
	const orders = useSelector(ordersSelector);

	/**
	 * toggle active orders
	 */
	const toggleActiveOrders = () => {
		// dispatch: update state
		const payload: SOCState = {
			...orders.content?.state,
			page: 0,
			activeOrders: !activeOrders
		};
		dispatch(OrderUpdateState(payload));
	};

	return (
		<FormControlLabel
			className={classes.sActiveOrders}
			control={
				<Checkbox
					color="primary"
					name="activeOrders"
					checked={activeOrders}
					onChange={toggleActiveOrders}
				/>
			}
			label={t('CONTENT.ORDERS.LIST.ACTIONS.ORDERS_ACTIVE.LABEL')}
		/>
	);
};
export default RobotOrdersActiveOrders;
