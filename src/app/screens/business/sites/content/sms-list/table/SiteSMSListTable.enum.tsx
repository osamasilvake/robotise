export enum SiteSMSListTableColumnsTypeEnum {
	ID = 'ID',
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
	SENT = 'sent',
	RECEIVING = 'receiving',
	FAILED = 'failed',
	UNDELIVERED = 'undelivered',
	REJECTED = 'rejected',
	REJECTED_ACCEPT_ORDER_FALSE = 'accept_order_false',
	REJECTED_NOT_IN_WHITELIST = 'room_is_not_in_whitelist',
	DELIVERED = 'delivered',
	RECEIVED = 'received',
	CONFIRMED = 'confirmed',
	ORDER_ASSIGNED = 'orderAssigned'
}
