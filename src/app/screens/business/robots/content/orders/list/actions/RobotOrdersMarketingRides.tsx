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
import { RobotOrdersMarketingRidesInterface } from './RobotOrdersActions.interface';

const RobotOrdersMarketingRides: FC<RobotOrdersMarketingRidesInterface> = (props) => {
	const { marketingRides } = props;
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch<AppDispatch>();
	const orders = useSelector(ordersSelector);

	/**
	 * handle marketing rides
	 */
	const handleMarketingRides = () => {
		// dispatch: update state
		const state: SOCStateInterface = {
			...orders.content?.state,
			page: 0,
			marketingRides: !marketingRides
		};
		dispatch(OrderUpdateState(state));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="marketingRides"
					checked={marketingRides}
					onChange={handleMarketingRides}
				/>
			}
			label={t<string>('CONTENT.ORDERS.LIST.ACTIONS.FILTERS.MARKETING_RIDES')}
		/>
	);
};
export default RobotOrdersMarketingRides;
