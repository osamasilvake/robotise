import { Paper } from '@material-ui/core';
import { FC } from 'react';

import { FloatStyles } from '../../../../../../../utilities/styles/Float.style';
import { RobotOrdersActionsInterface } from './RobotOrdersActions.interface';
import RobotOrdersActiveOrders from './RobotOrdersActiveOrders';
import RobotOrdersCreateOrder from './RobotOrdersNewOrder';

const RobotOrdersActions: FC<RobotOrdersActionsInterface> = (props) => {
	const { activeOrders, setActiveOrders, setPage } = props;
	const floatStyles = FloatStyles();

	return (
		<Paper elevation={2} square className={floatStyles.sFloat1}>
			{/* Active Orders */}
			<RobotOrdersActiveOrders
				activeOrders={activeOrders}
				setActiveOrders={setActiveOrders}
				setPage={setPage}
			/>

			{/* Create Order */}
			<RobotOrdersCreateOrder />
		</Paper>
	);
};
export default RobotOrdersActions;
