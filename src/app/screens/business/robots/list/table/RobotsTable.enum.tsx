export enum RobotsTableColumnsTypeEnum {
	ROBOT_TITLE = 'robotTitle',
	ACTIVE = 'robotIsReady',
	ACCEPT_ORDER = 'siteAcceptOrders',
	CONTROL_MODE = 'robotControlMode',
	MISSION_STATUS = 'robotMissionStatus',
	UPDATED_AT = 'updatedAt',
	ALERTS = 'alerts'
}

export enum RobotsTableSortTypeEnum {
	DATE,
	STRING,
	OBJECT_ALERT,
	BOOLEAN
}
