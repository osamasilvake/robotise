export enum RobotDetailSafetyKeysTypeEnum {
	FRONT_MUTING_ACTIVE = 'frontMutingActive',
	BACK_MUTING_ACTIVE = 'backMutingActive',
	BRAKE_RELEASED = 'brakeReleased',
	BRAKE_RELEASE_PRESSED = 'brakeReleasePressed',
	FORCE_BRAKE_ACTIVE = 'forceBrakeActive',
	FORCE_STOP0_ACTIVE = 'forceStop0Active',
	STOP0_RESET_REQUIRED = 'stop0ResetRequired',
	STOP1_RESET_REQUIRED = 'stop1ResetRequired',
	NO_STOP2_TRIGGER = 'noStop2Trigger',
	DRAWERS = 'drawers',
	LIDAR_BOTTOM = 'lidarBottom',
	LIDAR_TOP = 'lidarTop',
	DRIVE_TORQUE_ENABLED = 'driveTorqueEnabled',
	NO_DRIVE_STOP = 'noDriveStop',
	NO_STOP = 'noStop0'
}

export enum RobotDetailSafetySystemCounterTypeEnum {
	WARNING,
	ERROR
}

export enum RobotDetailInformationTypeEnum {
	SAFETY_SENSORS = 'SAFETY_SENSORS',
	SAFETY_SYSTEMS = 'SAFETY_SYSTEMS',
	COMPUTER_INFO = 'COMPUTER_INFO',
	HUMAN_PERCEPTION = 'HUMAN_PERCEPTION',
	TRANSIT_POINT_STARTED = 'TRANSIT_POINT_STARTED'
}
