export enum RobotsTableColumnsTypeEnum {
	ROBOT_TITLE = 'robotTitle',
	SITE_TITLE = 'siteTitle',
	STATUS = 'robotIsReady',
	ACCEPT_ORDER = 'siteAcceptOrders',
	UPDATED_AT = 'updatedAt',
	ALERTS = 'alerts'
}

export enum RobotsTableSortTypeEnum {
	DATE,
	STRING,
	OBJECT_ALERT,
	BOOLEAN
}
