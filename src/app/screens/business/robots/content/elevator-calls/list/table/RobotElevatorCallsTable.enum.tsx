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
	ERROR = 'elevator.event.error'
}
