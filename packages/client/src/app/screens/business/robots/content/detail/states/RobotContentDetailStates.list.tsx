import { RTSMappedResponseDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export const robotStates = (robot: RTSMappedResponseDataInterface) => [
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
		title: 'CONTENT.DETAIL.STATES.EMERGENCY_BRAKE.TITLE',
		type: 'emergencyBrakeState',
		content: robot.emergencyBrakeState
	},
	{
		title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.TITLE_LEFT',
		type: 'motorLeftWheelState',
		content: robot.motorLeftWheelState
	},
	{
		title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.TITLE_RIGHT',
		type: 'motorRightWheelState',
		content: robot.motorRightWheelState
	},
	{
		title: 'CONTENT.DETAIL.STATES.JOYSTICK.TITLE',
		type: 'joystickState',
		content: robot.joystickState
	},
	{ title: 'CONTENT.DETAIL.STATES.LIDAR.TITLE', type: 'lidarState', content: robot.lidarState },
	{
		title: 'CONTENT.DETAIL.STATES.REALSENSE.TITLE',
		type: 'realsenseState',
		content: robot.realsenseState
	},
	{
		title: 'CONTENT.DETAIL.STATES.ACTIVITY.TITLE',
		type: 'activity',
		content: robot.activityState
	}
];
