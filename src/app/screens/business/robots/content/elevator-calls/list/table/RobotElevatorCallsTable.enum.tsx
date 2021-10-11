export enum RobotElevatorCallsTableColumnsTypeEnum {
	STATUS = 'status',
	VENDOR = 'vendor',
	CALL_TYPE = 'callType',
	SRC_AREA_ID = 'srcAreaId',
	DST_AREA_ID = 'dstAreaId',
	HISTORY = 'history',
	CREATED = 'createdAt'
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
	ERROR = 'error'
}
