import { Add } from '@material-ui/icons';

import {
	RobotOrderModeTypeEnum,
	RobotOrdersActionsSpeedDialTypeEnum
} from './RobotOrdersActions.enum';

/**
 * order actions
 */
export const orderActions = [
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
