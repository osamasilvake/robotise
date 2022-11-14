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
import { RobotOrdersDebugInterface } from './RobotOrdersActions.interface';

const RobotOrdersDebug: FC<RobotOrdersDebugInterface> = (props) => {
	const { debug } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const orders = useSelector(ordersSelector);

	/**
	 * handle debug
	 */
	const handleDebug = () => {
		// dispatch: update state
		const state: SOCStateInterface = {
			...orders.content?.state,
			page: 0,
			debug: !debug
		};
		dispatch(OrderUpdateState(state));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox color="primary" name="debug" checked={debug} onChange={handleDebug} />
			}
			label={t<string>('COMMON.ORDERS.LIST.ACTIONS.FILTERS.DEBUG')}
		/>
	);
};
export default RobotOrdersDebug;
