export enum RobotElevatorCallsTableColumnsTypeEnum {
	API_STATUS = 'status',
	E2E_STATUS = 'e2eStatus',
	CALL_TYPE = 'callType',
	SRC_AREA_ID = 'srcAreaId',
	DST_AREA_ID = 'dstAreaId',
	HISTORY = 'history',
	CREATED = 'createdAt',
	ELEVATOR_LOGS = 'elevatorLogs'
}

export enum RobotElevatorCallsTableSortTypeEnum {
	DATE,
	STRING
}

export enum RobotElevatorCallsTableColumnStatusTypeEnum {
	CREATED = 'created',
	PROGRESS = 'in_progress',
	SUCCESS = 'successful',
	FAILED = 'failed'
}

export enum RobotElevatorCallsTableColumnHistoryEventTypeEnum {
	ERROR = 'elevator.event.error',
	SEND_LIFT = 'elevator.event.gotCallStatus'
}

export enum RobotElevatorCallsTableColumnHistoryDetailsTypeEnum {
	ENTER_CAR = 'enter_car',
	EXIT_CAR = 'exit_car'
}

export enum RobotElevatorCallsVendorTypeEnum {
	MANUAL_TEST = 'manual-test'
}

export enum RobotElevatorCallsManualTestTypeEnum {
	SEND_LIFT = 'SEND_LIFT',
	ENTER_CAR = 'ENTER_CAR',
	EXIT_CAR = 'EXIT_CAR'
}
