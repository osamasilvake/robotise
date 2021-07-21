import { Box, Divider, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyle } from '../../../../../../../utilities/styles/Float.style';
import { RobotOrdersActionsInterface } from './RobotOrdersActions.interface';
import { RobotOrdersActionsStyle } from './RobotOrdersActions.style';
import RobotOrdersActiveOrders from './RobotOrdersActiveOrders';
import RobotOrdersCreateOrder from './RobotOrdersCreateOrder';
import RobotOrdersDebug from './RobotOrdersDebug';

const RobotOrdersActions: FC<RobotOrdersActionsInterface> = (props) => {
	const { activeOrders, debug } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersActionsStyle();
	const floatStyle = FloatStyle();

	const common = 'CONTENT.ORDERS.LIST.ACTIONS.HEADINGS';

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
			<Box className={classes.sFilterBlock}>
				{/* Heading */}
				<Typography variant="h6" color="textSecondary">
					{t(`${common}.FILTERS`)}
				</Typography>

				{/* Active Orders */}
				<RobotOrdersActiveOrders activeOrders={activeOrders} />

				{/* Debug */}
				<RobotOrdersDebug debug={debug} />
			</Box>

			<Divider />

			<Box className={classes.sActionBlock}>
				{/* Heading */}
				<Typography variant="h6" color="textSecondary">
					{t(`${common}.ACTIONS`)}
				</Typography>

				{/* Create Order */}
				<RobotOrdersCreateOrder />
			</Box>
		</Paper>
	);
};
export default RobotOrdersActions;
