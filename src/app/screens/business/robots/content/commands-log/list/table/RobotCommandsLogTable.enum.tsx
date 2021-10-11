export enum RobotCommandsLogTableColumnsTypeEnum {
	COMMAND = 'command',
	STATUS = 'status',
	HISTORY = 'history',
	CREATED = 'createdAt'
}

export enum RobotCommandsLogTableSortTypeEnum {
	DATE,
	STRING
}

export enum RobotCommandsLogTableColumnStatusTypeEnum {
	PROGRESS = 'progress',
	SUCCESS = 'succeed',
	REJECTED = 'rejected',
	FAILED = 'failed'
}
