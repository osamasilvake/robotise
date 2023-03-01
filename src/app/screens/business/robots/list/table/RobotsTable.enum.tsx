export enum RobotsTableColumnsTypeEnum {
	ROBOT_ID = 'robotID',
	ROBOT_TITLE = 'robotTitle',
	ACTIVE = 'robotIsReady',
	ACCEPT_ORDER = 'siteAcceptOrders',
	CONTROL_MODE = 'robotControlMode',
	BATTERY_PERCENTAGE = 'robotBatteryPercentage',
	MISSION_STATUS = 'robotMission',
	UPDATED = 'updatedAt',
	ALERTS = 'robotAlerts'
}

export enum RobotsTableSortTypeEnum {
	DATE,
	STRING,
	OBJECT_ALERT,
	OBJECT_MISSION,
	BOOLEAN,
	NUMBER
}
