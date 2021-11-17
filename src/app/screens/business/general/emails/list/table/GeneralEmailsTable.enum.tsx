export enum GeneralEmailsTableColumnsTypeEnum {
	SITE = 'site',
	STATUS = 'status',
	HISTORY = 'history',
	NOTIFICATION_CODE = 'notificationCode',
	CREATED = 'createdAt'
}

export enum GeneralEmailsTableSortTypeEnum {
	DATE,
	STRING,
	STRING_SITE
}

export enum GeneralEmailsTableColumnHistoryEventTypeEnum {
	CREATED = 'created',
	PROCESSED = 'processed',
	DELIVERED = 'delivered',
	BOUNCE = 'bounce'
}
