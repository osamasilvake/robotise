export enum RobotLogsTableColumnsTypeEnum {
	COMMAND = 'command',
	STATUS = 'status',
	CREATED = 'createdAt'
}

export enum RobotLogsTableSortTypeEnum {
	DATE,
	STRING
}

export enum RobotLogsTableColumnStatusTypeEnum {
	PROGRESS = 'progress',
	SUCCESS = 'succeed',
	REJECTED = 'rejected',
	FAILED = 'failed'
}
