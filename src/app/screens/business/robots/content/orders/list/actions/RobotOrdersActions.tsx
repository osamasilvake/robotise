import { Box, Divider, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyles } from '../../../../../../../utilities/styles/Float.style';
import { RobotOrdersActionsInterface } from './RobotOrdersActions.interface';
import { RobotOrdersActionsStyles } from './RobotOrdersActions.style';
import RobotOrdersActiveOrders from './RobotOrdersActiveOrders';
import RobotOrdersCreateOrder from './RobotOrdersCreateOrder';
import RobotOrdersDebug from './RobotOrdersDebug';

const RobotOrdersActions: FC<RobotOrdersActionsInterface> = (props) => {
	const { activeOrders, debug, topSpace } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersActionsStyles();
	const floatStyles = FloatStyles();

	return (
		<Paper
			elevation={2}
			square
			className={clsx(floatStyles.sFloat1, {
				[classes.sFloatBoxTopSpace]: topSpace
			})}>
			<Box className={classes.sFilterBlock}>
				{/* Heading */}
				<Typography variant="h6" color="textSecondary">
					{t('CONTENT.ORDERS.LIST.ACTIONS.HEADINGS.FILTERS')}
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
					{t('CONTENT.ORDERS.LIST.ACTIONS.HEADINGS.ACTIONS')}
				</Typography>

				{/* Create Order */}
				<RobotOrdersCreateOrder />
			</Box>
		</Paper>
	);
};
export default RobotOrdersActions;
