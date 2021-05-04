import { RobotDetailCommandsActionTypeEnum } from './RobotDetailCommands.enum';

export const rotateAngles = [
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		value: '-90'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		value: '-45'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		value: '-30'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		value: '-15'
	},
	{
		type: 'init',
		value: 'None'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		value: '15'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		value: '30'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		value: '45'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		value: '90'
	}
];

export const translateDistances = [
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		label: '-10',
		value: '-0.1'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		label: '-5',
		value: '-0.05'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		label: '-3',
		value: '-0.03'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		label: '-1',
		value: '-0.01'
	},
	{
		type: 'init',
		label: 'None',
		value: 'none'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		label: '1',
		value: '0.01'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		label: '3',
		value: '0.03'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		label: '5',
		value: '0.05'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		label: '10',
		value: '0.1'
	}
];
