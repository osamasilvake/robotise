export enum RobotOrdersTableColumnsTypeEnum {
	ID = 'ID',
	STATUS = 'status',
	TARGET = 'location',
	MODE = 'mode',
	CREATED = 'createdAt',
	ORIGIN = 'origin',
	PURCHASE_DETAILS = 'orderReport'
}

export enum RobotOrdersTableSortTypeEnum {
	DATE,
	STRING
}

export enum RobotOrdersTableColumnStatusTypeEnum {
	CREATED = 'created',
	PENDING = 'pending',
	ARRIVED = 'in_progress:arrived',
	FINISH_REQUESTED = 'finishRequest',
	AWAITING_CANCELLATION = 'awaiting_cancelation',
	AWAITING_FINISH = 'awaiting_finish',
	FINISHED = 'finished',
	CUSTOMER_PRESENT = 'in_progress:customer_present',
	TRAVELING = 'in_progress:traveling',
	CANCELED = 'canceled',
	PHONE_ANSWERED = 'in_progress:phone_answered',
	INTERACTION_TIMEOUT_INCOMPLETE_INTERACTION = 'timeout:incomplete_interaction',
	INTERACTION_TIMEOUT_CUSTOMER_NOT_PRESENT = 'timeout:customer_not_present',
	CANCELED_REQUEST = 'cancelRequest',
	REJECTED = 'rejected',
	REJECTED_ALREADY_IN_STACK = 'rejected:already_in_stack',
	REJECTED_UNKNOWN_LOCATION = 'rejected:unknown_location',
	ERROR = 'error',
	/** @deprecated */
	CANCELED_TIMEOUT_DURING_INTERACTION = 'canceled:timeout_during_interaction',
	/** @deprecated */
	CANCELED_TIMEOUT_CUSTOMER_NOT_PRESENT = 'canceled:timeout_customer_not_present'
}
