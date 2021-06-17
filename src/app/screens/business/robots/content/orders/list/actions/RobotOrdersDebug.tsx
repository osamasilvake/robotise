import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ordersSelector, OrderUpdateState } from '../../../../../../../slices/orders/Orders.slice';
import { SOCState } from '../../../../../../../slices/orders/Orders.slice.interface';
import { RobotOrdersDebugInterface } from './RobotOrdersActions.interface';

const RobotOrdersDebug: FC<RobotOrdersDebugInterface> = (props) => {
	const { debug } = props;
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const orders = useSelector(ordersSelector);

	/**
	 * toggle debug
	 */
	const toggleDebug = () => {
		// dispatch: update state
		const state: SOCState = {
			...orders.content?.state,
			page: 0,
			debug: !debug
		};
		dispatch(OrderUpdateState(state));
	};

	return (
		<Box>
			<FormControlLabel
				control={
					<Checkbox color="primary" name="debug" checked={debug} onChange={toggleDebug} />
				}
				label={t('CONTENT.ORDERS.LIST.ACTIONS.DEBUG.LABEL')}
			/>
		</Box>
	);
};
export default RobotOrdersDebug;
