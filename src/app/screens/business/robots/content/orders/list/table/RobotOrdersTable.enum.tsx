export enum RobotOrdersTableColumnsTypeEnum {
	STATUS = 'status',
	TARGET = 'location',
	MODE = 'mode',
	ORIGIN = 'origin',
	CREATED = 'createdAt'
}

export enum RobotOrdersTableSortTypeEnum {
	DATE,
	STRING
}

export enum RobotOrdersTableColumnStatusTypeEnum {
	CREATED = 'created',
	PENDING = 'pending',
	TIMEOUT = 'canceled:timeout_during_interaction',
	ARRIVED = 'in_progress:arrived',
	FINISHED = 'finished',
	CUSTOMER_PRESENT = 'in_progress:customer_present',
	TRAVELLING = 'in_progress:traveling',
	CANCELED = 'canceled',
	CANCELED_REQUEST = 'cancelRequest',
	REJECTED = 'rejected',
	REJECTED_ALREADY_IN_STACK = 'rejected:already_in_stack',
	REJECTED_UNKNOWN_LOCATION = 'rejected:unknown_location',
	ERROR = 'error'
}
