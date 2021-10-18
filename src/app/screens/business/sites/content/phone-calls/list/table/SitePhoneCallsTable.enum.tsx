export enum SitePhoneCallsTableColumnsTypeEnum {
	ROOM = 'room',
	STATUS = 'status',
	MODE = 'mode',
	FROM = 'from',
	WORKFLOW = 'workflow',
	HISTORY = 'history',
	UPDATED_AT = 'updatedAt'
}

export enum SitePhoneCallsTableSortTypeEnum {
	DATE,
	STRING
}

export enum SitePhoneCallsTableColumnHistoryEventTypeEnum {
	APPROVED = 'approved',
	CONFIRMED = 'confirmed',
	ORDER_ASSIGNED = 'orderAssigned',
	REJECTED = 'rejected'
}
