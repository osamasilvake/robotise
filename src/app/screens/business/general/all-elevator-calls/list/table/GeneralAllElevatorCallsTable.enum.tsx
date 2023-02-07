export enum GeneralAllElevatorCallsTableColumnsTypeEnum {
	SITE_ROBOT = 'siteRobot',
	API_STATUS = 'status',
	E2E_STATUS = 'e2eStatus',
	CALL_TYPE = 'callType',
	VENDOR = 'vendor',
	SRC_AREA_ID = 'srcAreaId',
	DST_AREA_ID = 'dstAreaId',
	HISTORY = 'history',
	CREATED = 'createdAt',
	ELEVATOR_LOGS = 'elevatorLogs'
}

export enum GeneralAllElevatorCallsTableSortTypeEnum {
	DATE,
	STRING
}

export enum GeneralAllElevatorCallsTableColumnStatusTypeEnum {
	CREATED = 'created',
	PROGRESS = 'in_progress',
	SUCCESS = 'successful',
	FAILED = 'failed'
}

export enum GeneralAllElevatorCallsTableColumnHistoryEventTypeEnum {
	ERROR = 'elevator.event.error'
}
