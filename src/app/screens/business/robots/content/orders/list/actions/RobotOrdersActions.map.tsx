import { Add, Assessment } from '@material-ui/icons';

import {
	RobotOrderModeTypeEnum,
	RobotOrdersActionsSpeedDialTypeEnum
} from './RobotOrdersActions.enum';

/**
 * order actions
 */
export const orderActions = [
	{
		icon: <Assessment />,
		name: 'CONTENT.ORDERS.LIST.ACTIONS.SPEED_DIAL.ORDERS_REPORT',
		operation: RobotOrdersActionsSpeedDialTypeEnum.ORDERS_REPORT
	},
	{
		icon: <Add />,
		name: 'CONTENT.ORDERS.LIST.ACTIONS.SPEED_DIAL.CREATE_ORDER',
		operation: RobotOrdersActionsSpeedDialTypeEnum.CREATE_ORDER
	}
];

/**
 * order modes
 * @returns
 */
export const orderModes = () => {
	return [
		RobotOrderModeTypeEnum.MINI_BAR,
		RobotOrderModeTypeEnum.ROOM_SERVICE,
		RobotOrderModeTypeEnum.SERVICE_POSITION
	];
};
