export enum SiteSMSListTableColumnsTypeEnum {
	TYPE = 'type',
	ROOM = 'room',
	STATUS = 'status',
	FROM = 'from',
	TO = 'to',
	HISTORY = 'history',
	UPDATED = 'updatedAt'
}

export enum SiteSMSListTableSortTypeEnum {
	DATE,
	STRING
}

export enum SiteSMSListTableColumnHistoryEventTypeEnum {
	APPROVED = 'approved',
	CONFIRMED = 'confirmed',
	COMPLETED = 'completed',
	ORDER_ASSIGNED = 'orderAssigned',
	BUSY = 'busy',
	REJECTED = 'rejected',
	ERROR = 'error',
	FAILED = 'failed',
	NO_ANSWER = 'no-answer',
	UNDEFINED = 'undefined'
}
