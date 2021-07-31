import { SRTContentDataInterface } from '../../../../../../slices/business/robots/RobotTwins.slice.interface';

const common = 'CONTENT.DETAIL.STATES';
export const robotStates = (robot: SRTContentDataInterface) => [
	{
		title: `${common}.BATTERY.TITLE`,
		type: 'batteryState',
		content: robot.batteryState
	},
	{
		title: `${common}.DOCKING.TITLE`,
		type: 'dockingState',
		content: robot.dockingState
	},
	{
		title: `${common}.JOYSTICK.TITLE`,
		type: 'joystickState',
		content: robot.joystickState
	},
	{
		title: `${common}.ACTIVITY.TITLE`,
		type: 'activity',
		content: robot.activityState
	}
];
