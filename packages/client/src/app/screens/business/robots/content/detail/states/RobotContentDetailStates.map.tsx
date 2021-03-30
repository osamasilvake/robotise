import { RTSMappedResponseDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { momentFormat2 } from '../../../../../../utilities/methods/Moment';

export const mapRobotStates = (type: string, robot: RTSMappedResponseDataInterface) => {
	const batteryState = robot.batteryState;
	const dockingState = robot.dockingState;
	const joystickState = robot.joystickState;
	const activityState = robot.activityState;

	const powerSupplyStatus = {
		text: '',
		icon: ''
	};

	switch (type) {
		case 'batteryState.current':
			return (
				batteryState && {
					title: 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.CURRENT',
					value: current(batteryState.current.value),
					date: momentFormat2(batteryState.current.updatedAt),
					icon: 'flash_auto'
				}
			);
		case 'batteryState.percentage':
			return (
				batteryState && {
					title: 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.PERCENTAGE',
					value: percentage(batteryState.percentage.value),
					date: momentFormat2(batteryState.percentage.updatedAt),
					icon: 'battery_charging_full'
				}
			);
		case 'batteryState.powerSupplyHealth':
			return (
				batteryState && {
					title: 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.TITLE',
					value: powerSupplyHealth(batteryState.powerSupplyHealth.value),
					date: momentFormat2(batteryState.powerSupplyHealth.updatedAt),
					icon: 'local_hospital'
				}
			);
		case 'batteryState.powerSupplyStatus':
			if (batteryState) {
				switch (batteryState.powerSupplyStatus.value) {
					case 'charging':
						powerSupplyStatus.text =
							'CONTENT.DETAIL.STATES.BATTERY.ITEMS.POWER.OPTIONS.CHARGING';
						powerSupplyStatus.icon = 'power';
						break;
					case 'discharging':
						powerSupplyStatus.text =
							'CONTENT.DETAIL.STATES.BATTERY.ITEMS.POWER.OPTIONS.DISCHARGING';
						powerSupplyStatus.icon = 'power_off';
						break;
					case 'not_charging':
						powerSupplyStatus.text =
							'CONTENT.DETAIL.STATES.BATTERY.ITEMS.POWER.OPTIONS.NOT_CHARGING';
						powerSupplyStatus.icon = 'power_off';
						break;
					case 'full':
						powerSupplyStatus.text =
							'CONTENT.DETAIL.STATES.BATTERY.ITEMS.POWER.OPTIONS.FULL';
						powerSupplyStatus.icon = 'power';
						break;
					case 'unknown':
					default:
						powerSupplyStatus.text =
							'CONTENT.DETAIL.STATES.BATTERY.ITEMS.POWER.OPTIONS.UNKNOWN';
						powerSupplyStatus.icon = 'power_off';
				}
			}
			return (
				batteryState && {
					title: 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.POWER.TITLE',
					value: powerSupplyStatus.text,
					date: momentFormat2(batteryState.powerSupplyStatus.updatedAt),
					icon: powerSupplyStatus.icon
				}
			);
		case 'batteryState.voltage':
			return (
				batteryState && {
					title: 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.VOLTAGE',
					value: voltage(batteryState.voltage.value),
					date: momentFormat2(batteryState.voltage.updatedAt),
					icon: 'flash_on'
				}
			);
		case 'dockingState.isDocked':
			return (
				dockingState && {
					title: 'CONTENT.DETAIL.STATES.DOCKING.ITEMS.DOCKING',
					value: dockingState.isDocked.value
						? 'CONTENT.DETAIL.STATES.DOCKING.ITEMS.DOCKED'
						: 'CONTENT.DETAIL.STATES.DOCKING.ITEMS.UNDOCKED',
					date: momentFormat2(dockingState.isDocked.updatedAt),
					icon: 'dock'
				}
			);
		case 'joystickState.controlMode':
			return (
				joystickState && {
					title: 'CONTENT.DETAIL.STATES.JOYSTICK.ITEMS.CONTROL_MODE',
					value: joystickState.controlMode.value,
					date: momentFormat2(joystickState.controlMode.updatedAt),
					icon: 'games'
				}
			);
		case 'activity.latest':
			return (
				activityState && {
					title: 'CONTENT.DETAIL.STATES.ACTIVITY.ITEMS.LATEST.TITLE',
					value: activity(activityState.latest.value),
					date: momentFormat2(activityState.latest.updatedAt),
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
	switch (value) {
		case 'good':
			return 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.OPTIONS.GOOD';
		case 'overheat':
			return 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.OPTIONS.OVERHEAT';
		case 'dead':
			return 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.OPTIONS.DEAD';
		case 'overvoltage':
			return 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.OPTIONS.OVERVOLTAGE';
		case 'unspec_failure':
			return 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.OPTIONS.UNSPECIFIED_FAILURE';
		case 'cold':
			return 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.OPTIONS.COLD';
		case 'watchdog_timer_expire':
			return 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.OPTIONS.WATCHDOG_TIMER_EXPIRE';
		case 'safety_timer_expire':
			return 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.OPTIONS.SAFETY_TIMER_EXPIRE';
		case 'unknown':
		default:
			return 'CONTENT.DETAIL.STATES.BATTERY.ITEMS.HEALTH.OPTIONS.UNKNOWN';
	}
};

/**
 * activity
 * @param value
 */
const activity = (value: string) => {
	switch (value) {
		case 'enteredLift':
			return 'CONTENT.DETAIL.STATES.ACTIVITY.ITEMS.LATEST.OPTIONS.LIFT_ENTERED';
		case 'leftLift':
			return 'CONTENT.DETAIL.STATES.ACTIVITY.ITEMS.LATEST.OPTIONS.LIFT_LEFT';
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
