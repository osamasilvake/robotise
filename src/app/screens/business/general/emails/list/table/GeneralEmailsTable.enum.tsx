export enum GeneralEmailsTableColumnsTypeEnum {
	RECIPIENT = 'recipient',
	FROM = 'from',
	SUBJECT = 'subject',
	CONTENT = 'content',
	NOTIFICATION_CODE = 'notificationCode',
	HISTORY = 'history',
	CREATED = 'createdAt'
}

export enum GeneralEmailsTableSortTypeEnum {
	OBJECT_FROM,
	DATE,
	STRING
}

export enum GeneralEmailsTableColumnHistoryEventTypeEnum {
	ERROR = 'elevator.event.error'
}
