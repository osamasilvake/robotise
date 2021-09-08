import { SRTContentDataInterface } from '../../../../../../slices/business/robots/RobotTwins.slice.interface';

const translation = 'CONTENT.DETAIL.STATES';
export const robotStates = (robot: SRTContentDataInterface) => [
	{
		title: `${translation}.BATTERY.TITLE`,
		type: 'batteryState',
		content: robot.batteryState
	},
	{
		title: `${translation}.DOCKING.TITLE`,
		type: 'dockingState',
		content: robot.dockingState
	},
	{
		title: `${translation}.JOYSTICK.TITLE`,
		type: 'joystickState',
		content: robot.joystickState
	},
	{
		title: `${translation}.ACTIVITY.TITLE`,
		type: 'activity',
		content: robot.activityState
	}
];
