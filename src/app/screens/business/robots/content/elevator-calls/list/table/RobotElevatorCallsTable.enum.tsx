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
	PROGRESS = 'progress',
	CREATED = 'created',
	SUCCESS = 'succeed',
	FAILED = 'failed'
}

export enum RobotElevatorCallsTableColumnCallTypeEnum {
	NORMAL = 'normal',
	TRAPPED = 'trapped'
}
