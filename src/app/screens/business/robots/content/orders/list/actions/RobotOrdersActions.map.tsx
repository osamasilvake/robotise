import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';

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
