import { SRTContentDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export const robotStates = (robot: SRTContentDataInterface) => [
	{
		title: 'CONTENT.DETAIL.STATES.BATTERY.TITLE',
		type: 'batteryState',
		content: robot.batteryState
	},
	{
		title: 'CONTENT.DETAIL.STATES.DOCKING.TITLE',
		type: 'dockingState',
		content: robot.dockingState
	},
	{
		title: 'CONTENT.DETAIL.STATES.JOYSTICK.TITLE',
		type: 'joystickState',
		content: robot.joystickState
	},
	{
		title: 'CONTENT.DETAIL.STATES.ACTIVITY.TITLE',
		type: 'activity',
		content: robot.activityState
	}
];
