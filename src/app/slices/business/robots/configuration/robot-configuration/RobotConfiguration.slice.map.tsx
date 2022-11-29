import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { RobotConfigurationTriggerMessageTypeEnum } from './RobotConfiguration.slice.enum';

/**
 * handle trigger message
 * @param status
 * @returns
 */
export const handleTriggerMessage = (status: string) => {
	switch (status) {
		case RobotConfigurationTriggerMessageTypeEnum.CREATED:
		case RobotConfigurationTriggerMessageTypeEnum.PROGRESS:
			return {
				severity: TriggerMessageTypeEnum.WARNING,
				text: 'ROBOTS.CONFIGURATION.ROBOT_CONFIGURATION.CREATED'
			};
		case RobotConfigurationTriggerMessageTypeEnum.SUCCEED:
			return {
				severity: TriggerMessageTypeEnum.SUCCESS,
				text: 'ROBOTS.CONFIGURATION.ROBOT_CONFIGURATION.SUCCESS'
			};
		case RobotConfigurationTriggerMessageTypeEnum.REJECTED:
		case RobotConfigurationTriggerMessageTypeEnum.FAILED:
			return {
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'ROBOTS.CONFIGURATION.ROBOT_CONFIGURATION.FAILED'
			};
		default:
			return {
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'ROBOTS.CONFIGURATION.ROBOT_CONFIGURATION.UNKNOWN'
			};
	}
};
