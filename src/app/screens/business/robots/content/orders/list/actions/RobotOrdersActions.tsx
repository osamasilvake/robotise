import { Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyles } from '../../../../../../../utilities/styles/Float.style';
import { RobotOrdersActionsInterface } from './RobotOrdersActions.interface';
import RobotOrdersActiveOrders from './RobotOrdersActiveOrders';
import RobotOrdersCreateOrder from './RobotOrdersCreateOrder';

const RobotOrdersActions: FC<RobotOrdersActionsInterface> = (props) => {
	const { activeOrders } = props;
	const { t } = useTranslation('ROBOTS');
	const floatStyles = FloatStyles();

	return (
		<Paper elevation={2} square className={floatStyles.sFloat1}>
			{/* Heading */}
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.ORDERS.LIST.OPTIONS.HEADING')}
			</Typography>

			{/* Active Orders */}
			<RobotOrdersActiveOrders activeOrders={activeOrders} />

			{/* Create Order */}
			<RobotOrdersCreateOrder />
		</Paper>
	);
};
export default RobotOrdersActions;
