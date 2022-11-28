export enum GeneralAllSMSListTableColumnsTypeEnum {
	TYPE = 'type',
	ROOM = 'room',
	STATUS = 'status',
	FROM = 'from',
	TO = 'to',
	HISTORY = 'history',
	UPDATED = 'updatedAt'
}

export enum GeneralAllSMSListTableSortTypeEnum {
	DATE,
	STRING
}

export enum GeneralAllSMSListTableColumnHistoryEventTypeEnum {
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
