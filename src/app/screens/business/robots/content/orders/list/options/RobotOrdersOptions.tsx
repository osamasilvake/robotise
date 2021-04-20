import { Paper } from '@material-ui/core';
import { FC } from 'react';

import { FloatStyles } from '../../../../../../../utilities/styles/Float.style';
import RobotOrdersOptionActiveOrders from './RobotOrdersOptionActiveOrders';
import RobotOrdersOptionNewOrder from './RobotOrdersOptionNewOrder';
import { RobotOrdersOptionsInterface } from './RobotOrdersOptions.interface';

const RobotOrdersOptions: FC<RobotOrdersOptionsInterface> = (props) => {
	const { activeOrders, setActiveOrders, executing } = props;
	const floatStyles = FloatStyles();

	return (
		<Paper elevation={2} square className={floatStyles.sFloat1}>
			{/* Active Orders */}
			<RobotOrdersOptionActiveOrders
				activeOrders={activeOrders}
				setActiveOrders={setActiveOrders}
				executing={executing}
			/>

			{/* New Order */}
			<RobotOrdersOptionNewOrder executing={executing} />
		</Paper>
	);
};
export default RobotOrdersOptions;
