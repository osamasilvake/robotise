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
		value: '-10'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		value: '-5'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		value: '-3'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.BACKWARD,
		value: '-1'
	},
	{
		type: 'init',
		value: 'None'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		value: '1'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		value: '3'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		value: '5'
	},
	{
		type: RobotDetailCommandsActionTypeEnum.FORWARD,
		value: '10'
	}
];
