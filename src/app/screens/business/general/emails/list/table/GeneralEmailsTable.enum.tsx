export enum GeneralEmailsTableColumnsTypeEnum {
	RECIPIENT = 'recipient',
	FROM = 'from',
	SUBJECT = 'subject',
	CONTENT = 'content',
	HISTORY = 'history',
	NOTIFICATION_CODE = 'notificationCode',
	CREATED = 'createdAt'
}

export enum GeneralEmailsTableSortTypeEnum {
	OBJECT_FROM,
	DATE,
	STRING
}

export enum GeneralEmailsTableColumnHistoryEventTypeEnum {
	CREATED = 'created',
	PROCESSED = 'processed',
	DELIVERED = 'delivered'
}
