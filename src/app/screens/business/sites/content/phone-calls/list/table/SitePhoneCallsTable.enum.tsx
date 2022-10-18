export enum SitePhoneCallsTableColumnsTypeEnum {
	TYPE = 'type',
	ROOM = 'room',
	STATUS = 'status',
	FROM = 'from',
	TO = 'to',
	HISTORY = 'history',
	UPDATED = 'updatedAt'
}

export enum SitePhoneCallsTableSortTypeEnum {
	DATE,
	STRING
}

export enum SitePhoneCallsTableColumnHistoryEventTypeEnum {
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
