export enum RobotDetailCommandsTypeEnum {
	CONTROL_START = 'remote-control-start',
	CONTROL_STOP = 'remote-control-stop',
	MUTE_SENSORS = 'set-mute-sensor-state',
	ROTATE = 'remote-control-rotate',
	TRANSLATE = 'remote-control-translate'
}

export enum RobotDetailCommandsControlTypeEnum {
	ROC_CONTROL = 'roc_control',
	AUTONOMOUS = 'autonomous',
	JOYSTICK = 'joystick'
}

export enum RobotDetailCommandsMuteSensorsTypeEnum {
	FRONT_MUTED = 'front-muted',
	BACK_MUTED = 'back-muted',
	NOTHING_MUTED = 'nothing-muted'
}

export enum RobotDetailCommandsActionTypeEnum {
	NONE,
	BACKWARD,
	FORWARD
}
