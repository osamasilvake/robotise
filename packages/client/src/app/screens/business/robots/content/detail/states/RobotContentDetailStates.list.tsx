import { RTSMappedResponseDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export const robotStates = (robot: RTSMappedResponseDataInterface) => [
	{ title: 'Battery State', type: 'batteryState', content: robot.batteryState },
	{ title: 'Docking State', type: 'dockingState', content: robot.dockingState },
	{
		title: 'Emergency Brake State',
		type: 'emergencyBrakeState',
		content: robot.emergencyBrakeState
	},
	{
		title: 'Motor Left Wheel State',
		type: 'motorLeftWheelState',
		content: robot.motorLeftWheelState
	},
	{
		title: 'Motor Right Wheel State',
		type: 'motorRightWheelState',
		content: robot.motorRightWheelState
	}
];
