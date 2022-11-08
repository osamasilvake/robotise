import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { RobotOrdersActionsInterface } from './RobotOrdersActions.interface';
import { RobotOrdersActionsStyle } from './RobotOrdersActions.style';
import RobotOrdersActiveOrders from './RobotOrdersActiveOrders';
import RobotOrdersCreate from './RobotOrdersCreate';
import RobotOrdersDebug from './RobotOrdersDebug';
import RobotOrdersMarketingRides from './RobotOrdersMarketingRides';

const RobotOrdersActions: FC<RobotOrdersActionsInterface> = (props) => {
	const { activeOrders, debug, marketingRides } = props;
	const classes = RobotOrdersActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					{/* Active Orders */}
					<RobotOrdersActiveOrders activeOrders={activeOrders} />

					{/* Debug */}
					<RobotOrdersDebug debug={debug} />

					{/* Marketing Rides */}
					<RobotOrdersMarketingRides marketingRides={marketingRides} />
				</Box>

				{/* Create Order */}
				<RobotOrdersCreate />
			</Stack>
		</Paper>
	);
};
export default RobotOrdersActions;
