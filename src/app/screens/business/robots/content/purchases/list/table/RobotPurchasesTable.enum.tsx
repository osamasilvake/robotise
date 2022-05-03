export enum RobotPurchasesTableColumnsTypeEnum {
	TARGET = 'location',
	CREATED = 'createdAt',
	TOTAL_PRICE = 'totalPrice',
	COMMENT = 'comment',
	BILLED = 'isBilled',
	ORDER_DETAILS = 'order',
	ITEM_TRACKING = 'itemTracking'
}

export enum RobotPurchasesTableSortTypeEnum {
	DATE,
	STRING,
	NUMBER,
	BOOLEAN
}
