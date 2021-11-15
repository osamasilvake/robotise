export enum GeneralEmailsTableColumnsTypeEnum {
	FROM = 'from',
	RECIPIENT = 'recipient',
	SUBJECT = 'subject',
	CONTENT = 'content',
	NOTIFICATION_CODE = 'notificationCode',
	HISTORY = 'history',
	CREATED = 'createdAt'
}

export enum GeneralEmailsTableSortTypeEnum {
	DATE,
	STRING
}

export enum GeneralEmailsTableColumnHistoryEventTypeEnum {
	ERROR = 'elevator.event.error'
}
