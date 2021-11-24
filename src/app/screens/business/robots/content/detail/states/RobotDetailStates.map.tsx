import { AppConfigService } from '../../../../../../services';
import { RobotBatteryLinkFetch } from '../../../../../../slices/business/robots/Robot.slice';
import { SRTContentDataInterface } from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import { momentFormat2 } from '../../../../../../utilities/methods/Moment';

export const mapRobotStates = (type: string, robot: SRTContentDataInterface) => {
	const batteryState = robot.batteryState;
	const dockingState = robot.dockingState;
	const joystickState = robot.joystickState;
	const activityState = robot.activityState;

	const powerSupplyStatus = {
		text: '',
		icon: ''
	};
	const translation = 'CONTENT.DETAIL.STATES';

	switch (type) {
		case 'batteryState.current':
			return (
				batteryState && {
					title: `${translation}.BATTERY.ITEMS.CURRENT`,
					value: current(batteryState.properties.current),
					date: momentFormat2(batteryState.updatedAt),
					icon: 'flash_auto'
				}
			);
		case 'batteryState.percentage':
			return (
				batteryState && {
					title: `${translation}.BATTERY.ITEMS.PERCENTAGE.TITLE`,
					value: percentage(batteryState.properties.percentage),
					date: momentFormat2(batteryState.updatedAt),
					icon: 'battery_charging_full',
					link: {
						label: `${translation}.BATTERY.ITEMS.PERCENTAGE.LINK`,
						action: RobotBatteryLinkFetch,
						tooltip: 'DEEPLINKS.BATTERY'
					}
				}
			);
		case 'batteryState.powerSupplyHealth':
			return (
				batteryState && {
					title: `${translation}.BATTERY.ITEMS.HEALTH.TITLE`,
					value: powerSupplyHealth(batteryState.properties.powerSupplyHealth),
					date: momentFormat2(batteryState.updatedAt),
					icon: 'healing'
				}
			);
		case 'batteryState.powerSupplyStatus':
			if (batteryState) {
				switch (batteryState.properties.powerSupplyStatus) {
					case 'charging':
						powerSupplyStatus.text = `${translation}.BATTERY.ITEMS.POWER.OPTIONS.CHARGING`;
						powerSupplyStatus.icon = 'power';
						break;
					case 'discharging':
						powerSupplyStatus.text = `${translation}.BATTERY.ITEMS.POWER.OPTIONS.DISCHARGING`;
						powerSupplyStatus.icon = 'power_off';
						break;
					case 'not_charging':
						powerSupplyStatus.text = `${translation}.BATTERY.ITEMS.POWER.OPTIONS.NOT_CHARGING`;
						powerSupplyStatus.icon = 'power_off';
						break;
					case 'full':
						powerSupplyStatus.text = `${translation}.BATTERY.ITEMS.POWER.OPTIONS.FULL`;
						powerSupplyStatus.icon = 'power';
						break;
					case 'unknown':
					default:
						powerSupplyStatus.text = AppConfigService.AppOptions.common.none;
						powerSupplyStatus.icon = 'power_off';
				}
			}
			return (
				batteryState && {
					title: `${translation}.BATTERY.ITEMS.POWER.TITLE`,
					value: powerSupplyStatus.text,
					date: momentFormat2(batteryState.updatedAt),
					icon: powerSupplyStatus.icon
				}
			);
		case 'batteryState.voltage':
			return (
				batteryState && {
					title: `${translation}.BATTERY.ITEMS.VOLTAGE`,
					value: voltage(batteryState.properties.voltage),
					date: momentFormat2(batteryState.updatedAt),
					icon: 'flash_on'
				}
			);
		case 'dockingState.isDocked':
			return (
				dockingState && {
					title: `${translation}.DOCKING.ITEMS.STATUS`,
					value: dockingState.properties.isDocked
						? `${translation}.DOCKING.ITEMS.DOCKED`
						: `${translation}.DOCKING.ITEMS.UN_DOCKED`,
					date: momentFormat2(dockingState.updatedAt),
					icon: 'dock'
				}
			);
		case 'joystickState.isConnected':
			return (
				joystickState && {
					title: `${translation}.JOYSTICK.ITEMS.STATUS`,
					value: joystickState.properties.isConnected
						? `${translation}.JOYSTICK.ITEMS.CONNECTED`
						: `${translation}.JOYSTICK.ITEMS.NOT_CONNECTED`,
					date: momentFormat2(joystickState.updatedAt),
					icon: 'games'
				}
			);
		case 'activity.latest':
			return (
				activityState && {
					title: `${translation}.ACTIVITY.ITEMS.LATEST.TITLE`,
					value: activity(activityState.properties.latest),
					date: momentFormat2(activityState.updatedAt),
					icon: 'timer'
				}
			);
		default:
			console.error('unknown state');
	}
};

/**
 * power supply
 * @param value
 * @returns
 */
const powerSupplyHealth = (value: string) => {
	const translation = 'CONTENT.DETAIL.STATES';
	switch (value) {
		case 'good':
			return `${translation}.BATTERY.ITEMS.HEALTH.OPTIONS.GOOD`;
		case 'overheat':
			return `${translation}.BATTERY.ITEMS.HEALTH.OPTIONS.OVERHEAT`;
		case 'dead':
			return `${translation}.BATTERY.ITEMS.HEALTH.OPTIONS.DEAD`;
		case 'overvoltage':
			return `${translation}.BATTERY.ITEMS.HEALTH.OPTIONS.OVERVOLTAGE`;
		case 'unspec_failure':
			return `${translation}.BATTERY.ITEMS.HEALTH.OPTIONS.UNSPECIFIED_FAILURE`;
		case 'cold':
			return `${translation}.BATTERY.ITEMS.HEALTH.OPTIONS.COLD`;
		case 'watchdog_timer_expire':
			return `${translation}.BATTERY.ITEMS.HEALTH.OPTIONS.WATCHDOG_TIMER_EXPIRE`;
		case 'safety_timer_expire':
			return `${translation}.BATTERY.ITEMS.HEALTH.OPTIONS.SAFETY_TIMER_EXPIRE`;
		case 'unknown':
		default:
			return AppConfigService.AppOptions.common.none;
	}
};

/**
 * activity
 * @param value
 */
const activity = (value: string) => {
	const translation = 'CONTENT.DETAIL.STATES';
	switch (value) {
		case 'enteredLift':
			return `${translation}.ACTIVITY.ITEMS.LATEST.OPTIONS.LIFT_ENTERED`;
		case 'leftLift':
			return `${translation}.ACTIVITY.ITEMS.LATEST.OPTIONS.LIFT_LEFT`;
		case 'leavingLift':
			return `${translation}.ACTIVITY.ITEMS.LATEST.OPTIONS.LIFT_LEAVING`;
		case undefined:
			return AppConfigService.AppOptions.common.none;
		default:
			return value;
	}
};

/**
 * percentage
 * @param value
 * @param precision
 * @returns
 */
const percentage = (value: number, precision = 0) => {
	let result;
	try {
		result = (value * 100).toFixed(precision);
	} catch (error) {
		result = value;
	}
	return `${result}%`;
};

/**
 * current
 * @param value
 * @param precision
 * @returns
 */
const current = (value: number, precision = 1) => {
	let result;
	try {
		result = value.toFixed(precision);
	} catch (error) {
		result = value;
	}
	return `${result}A`;
};

/**
 * voltage
 * @param value
 * @param precision
 * @returns
 */
const voltage = (value: number, precision = 1) => {
	let result;
	try {
		result = value.toFixed(precision);
	} catch (error) {
		result = value;
	}
	return `${result}V`;
};
