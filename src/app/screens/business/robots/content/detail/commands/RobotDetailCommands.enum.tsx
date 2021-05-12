export enum RobotDetailCommandsTypeEnum {
	CONTROL_MODE = 'set-control-mode',
	MUTE_SENSORS = 'set-mute-sensor-state',
	ROTATE = 'remote-control-rotate',
	TRANSLATE = 'remote-control-translate'
}

export enum RobotDetailControlModeTypeEnum {
	UNKNOWN = 'unknown',
	ROC_CONTROL = 'roc_control',
	JOYSTICK = 'joystick',
	AUTONOMOUS = 'autonomous'
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
