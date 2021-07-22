import { AppConfigService } from '../../../../../../services';
import { SRTContentDataInterface } from '../../../../../../slices/robots/RobotTwins.slice.interface';
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
	const common = 'CONTENT.DETAIL.STATES';

	switch (type) {
		case 'batteryState.current':
			return (
				batteryState && {
					title: `${common}.BATTERY.ITEMS.CURRENT`,
					value: current(batteryState.properties.current),
					date: momentFormat2(batteryState.updatedAt),
					icon: 'flash_auto'
				}
			);
		case 'batteryState.percentage':
			return (
				batteryState && {
					title: `${common}.BATTERY.ITEMS.PERCENTAGE`,
					value: percentage(batteryState.properties.percentage),
					date: momentFormat2(batteryState.updatedAt),
					icon: 'battery_charging_full'
				}
			);
		case 'batteryState.powerSupplyHealth':
			return (
				batteryState && {
					title: `${common}.BATTERY.ITEMS.HEALTH.TITLE`,
					value: powerSupplyHealth(batteryState.properties.powerSupplyHealth),
					date: momentFormat2(batteryState.updatedAt),
					icon: 'healing'
				}
			);
		case 'batteryState.powerSupplyStatus':
			if (batteryState) {
				switch (batteryState.properties.powerSupplyStatus) {
					case 'charging':
						powerSupplyStatus.text = `${common}.BATTERY.ITEMS.POWER.OPTIONS.CHARGING`;
						powerSupplyStatus.icon = 'power';
						break;
					case 'discharging':
						powerSupplyStatus.text = `${common}.BATTERY.ITEMS.POWER.OPTIONS.DISCHARGING`;
						powerSupplyStatus.icon = 'power_off';
						break;
					case 'not_charging':
						powerSupplyStatus.text = `${common}.BATTERY.ITEMS.POWER.OPTIONS.NOT_CHARGING`;
						powerSupplyStatus.icon = 'power_off';
						break;
					case 'full':
						powerSupplyStatus.text = `${common}.BATTERY.ITEMS.POWER.OPTIONS.FULL`;
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
					title: `${common}.BATTERY.ITEMS.POWER.TITLE`,
					value: powerSupplyStatus.text,
					date: momentFormat2(batteryState.updatedAt),
					icon: powerSupplyStatus.icon
				}
			);
		case 'batteryState.voltage':
			return (
				batteryState && {
					title: `${common}.BATTERY.ITEMS.VOLTAGE`,
					value: voltage(batteryState.properties.voltage),
					date: momentFormat2(batteryState.updatedAt),
					icon: 'flash_on'
				}
			);
		case 'dockingState.isDocked':
			return (
				dockingState && {
					title: `${common}.DOCKING.ITEMS.STATUS`,
					value: dockingState.properties.isDocked
						? `${common}.DOCKING.ITEMS.DOCKED`
						: `${common}.DOCKING.ITEMS.UN_DOCKED`,
					date: momentFormat2(dockingState.updatedAt),
					icon: 'dock'
				}
			);
		case 'joystickState.isConnected':
			return (
				joystickState && {
					title: `${common}.JOYSTICK.ITEMS.STATUS`,
					value: joystickState.properties.isConnected
						? `${common}.JOYSTICK.ITEMS.CONNECTED`
						: `${common}.JOYSTICK.ITEMS.NOT_CONNECTED`,
					date: momentFormat2(joystickState.updatedAt),
					icon: 'games'
				}
			);
		case 'activity.latest':
			return (
				activityState && {
					title: `${common}.ACTIVITY.ITEMS.LATEST.TITLE`,
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
	const common = 'CONTENT.DETAIL.STATES';
	switch (value) {
		case 'good':
			return `${common}.BATTERY.ITEMS.HEALTH.OPTIONS.GOOD`;
		case 'overheat':
			return `${common}.BATTERY.ITEMS.HEALTH.OPTIONS.OVERHEAT`;
		case 'dead':
			return `${common}.BATTERY.ITEMS.HEALTH.OPTIONS.DEAD`;
		case 'overvoltage':
			return `${common}.BATTERY.ITEMS.HEALTH.OPTIONS.OVERVOLTAGE`;
		case 'unspec_failure':
			return `${common}.BATTERY.ITEMS.HEALTH.OPTIONS.UNSPECIFIED_FAILURE`;
		case 'cold':
			return `${common}.BATTERY.ITEMS.HEALTH.OPTIONS.COLD`;
		case 'watchdog_timer_expire':
			return `${common}.BATTERY.ITEMS.HEALTH.OPTIONS.WATCHDOG_TIMER_EXPIRE`;
		case 'safety_timer_expire':
			return `${common}.BATTERY.ITEMS.HEALTH.OPTIONS.SAFETY_TIMER_EXPIRE`;
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
	const common = 'CONTENT.DETAIL.STATES';
	switch (value) {
		case 'enteredLift':
			return `${common}.ACTIVITY.ITEMS.LATEST.OPTIONS.LIFT_ENTERED`;
		case 'leftLift':
			return `${common}.ACTIVITY.ITEMS.LATEST.OPTIONS.LIFT_LEFT`;
		case 'leavingLift':
			return `${common}.ACTIVITY.ITEMS.LATEST.OPTIONS.LIFT_LEAVING`;
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
