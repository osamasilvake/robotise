export enum RobotsTableColumnsTypeEnum {
	ROBOT_TITLE = 'robotTitle',
	ACTIVE = 'robotIsReady',
	ACCEPT_ORDER = 'siteAcceptOrders',
	CONTROL_MODE = 'robotControlMode',
	BATTERY_PERCENTAGE = 'robotBatteryPercentage',
	MISSION_STATUS = 'robotMission',
	UPDATED_AT = 'updatedAt',
	ALERTS = 'alerts'
}

export enum RobotsTableSortTypeEnum {
	DATE,
	STRING,
	OBJECT_ALERT,
	OBJECT_MISSION,
	BOOLEAN,
	NUMBER
}
