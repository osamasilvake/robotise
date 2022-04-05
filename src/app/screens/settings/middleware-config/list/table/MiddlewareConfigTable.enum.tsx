export enum MiddlewareConfigTableColumnsTypeEnum {
	KEY = 'key',
	DIRECTION = 'direction',
	AUDIT = 'audit',
	DEBUG = 'debug',
	SAVE_HISTORY = 'saveHistory',
	STOP_PROPAGATE = 'stopPropagate',
	STATUS = 'status',
	ACTIONS = 'actions',
	CREATED_AT = 'createdAt'
}

export enum MiddlewareConfigTableSortTypeEnum {
	DATE,
	STRING,
	BOOLEAN
}

export enum MiddlewareConfigCreateEditTypeEnum {
	CREATE,
	EDIT
}

export enum MiddlewareConfigResetTypeEnum {
	RESET = 1,
	NA = 2
}
