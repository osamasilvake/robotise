import { Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ordersSelector, OrderUpdateState } from '../../../../../../../slices/orders/Orders.slice';
import { RobotOrdersActiveOrdersInterface } from './RobotOrdersActions.interface';
import { RobotOrdersActionsStyles } from './RobotOrdersActions.style';

const RobotOrdersActiveOrders: FC<RobotOrdersActiveOrdersInterface> = (props) => {
	const { setPage } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersActionsStyles();

	const dispatch = useDispatch();
	const orders = useSelector(ordersSelector);

	const activeOrders = !!orders.content?.state?.activeOrders;

	/**
	 * toggle active orders
	 */
	const toggleActiveOrders = () => {
		// dispatch: update state
		const payload = {
			...orders.content?.state,
			activeOrders: !activeOrders
		};
		dispatch(OrderUpdateState(payload));

		// set page
		setPage(0);
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
			label={t('CONTENT.ORDERS.LIST.OPTIONS.ORDERS_ACTIVE.LABEL')}
		/>
	);
};
export default RobotOrdersActiveOrders;
