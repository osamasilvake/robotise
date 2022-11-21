export enum GeneralAllPhoneCallsTableColumnsTypeEnum {
	SITE_ROBOT = 'siteRobot',
	TYPE = 'type',
	ROOM = 'room',
	STATUS = 'status',
	FROM = 'from',
	TO = 'to',
	HISTORY = 'history',
	UPDATED = 'updatedAt'
}

export enum GeneralAllPhoneCallsTableSortTypeEnum {
	DATE,
	STRING
}

export enum GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum {
	APPROVED = 'approved',
	CONFIRMED = 'confirmed',
	COMPLETED = 'completed',
	ORDER_ASSIGNED = 'orderAssigned',
	BUSY = 'busy',
	MISSING_FROM = 'missing-from',
	REJECTED = 'rejected',
	ERROR = 'error',
	FAILED = 'failed',
	NO_ANSWER = 'no-answer',
	UNDEFINED = 'undefined'
}
