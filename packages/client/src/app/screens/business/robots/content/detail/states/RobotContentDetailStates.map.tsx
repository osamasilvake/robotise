import { RTSMappedResponseDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { momentFormat2 } from '../../../../../../utilities/methods/Moment';

export const mapRobotStates = (type: string, robot: RTSMappedResponseDataInterface) => {
	const batteryState = robot.batteryState;
	const dockingState = robot.dockingState;
	const motorLeftWheelState = robot.motorLeftWheelState;
	const motorRightWheelState = robot.motorRightWheelState;
	const emergencyBrakeState = robot.emergencyBrakeState;
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
		case 'emergencyBrakeState.votedYes':
			return (
				emergencyBrakeState && {
					title: 'CONTENT.DETAIL.STATES.EMERGENCY_BRAKE.ITEMS.VOTED_YES',
					value: emergencyBrakeState.votedYes.value,
					date: momentFormat2(emergencyBrakeState.votedYes.updatedAt),
					icon: 'how_to_vote'
				}
			);
		case 'motorLeftWheelState.commandedVelocity':
			return (
				motorLeftWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.COMMANDED_VELOCITY',
					value: velocity(motorLeftWheelState.velocity.value),
					date: momentFormat2(motorLeftWheelState.velocity.updatedAt),
					icon: 'speed'
				}
			);
		case 'motorLeftWheelState.controllerTemperature':
			return (
				motorLeftWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.CONTROLLER_TEMPERATURE',
					value: temperature(motorLeftWheelState.controllerTemperature.value),
					date: momentFormat2(motorLeftWheelState.controllerTemperature.updatedAt),
					icon: 'title'
				}
			);
		case 'motorLeftWheelState.controllerVoltage':
			return (
				motorLeftWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.CONTROLLER_VOLTAGE',
					value: voltage(motorLeftWheelState.controllerVoltage.value),
					date: momentFormat2(motorLeftWheelState.controllerVoltage.updatedAt),
					icon: 'flash_on'
				}
			);
		case 'motorLeftWheelState.lastErrorCode':
			return (
				motorLeftWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.LAST_ERROR_CODE',
					value: motorLeftWheelState.lastErrorCode.value,
					date: momentFormat2(motorLeftWheelState.lastErrorCode.updatedAt),
					icon: 'warning'
				}
			);
		case 'motorLeftWheelState.motorCurrent':
			return (
				motorLeftWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.MOTOR_CURRENT',
					value: current(motorLeftWheelState.motorCurrent.value),
					date: momentFormat2(motorLeftWheelState.motorCurrent.updatedAt),
					icon: 'flash_auto'
				}
			);
		case 'motorLeftWheelState.velocity':
			return (
				motorLeftWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.VELOCITY',
					value: velocity(motorLeftWheelState.velocity.value),
					date: momentFormat2(motorLeftWheelState.velocity.updatedAt),
					icon: 'speed'
				}
			);
		case 'motorLeftWheelState.position':
			return (
				motorLeftWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.POSITION',
					value: motorLeftWheelState.position.value.toFixed(3),
					date: momentFormat2(motorLeftWheelState.position.updatedAt),
					icon: 'room'
				}
			);
		case 'motorLeftWheelState.status':
			return (
				motorLeftWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.STATUS',
					value: motorLeftWheelState.status.value,
					date: momentFormat2(motorLeftWheelState.status.updatedAt),
					icon: 'new_releases'
				}
			);
		case 'motorRightWheelState.commandedVelocity':
			return (
				motorRightWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.COMMANDED_VELOCITY',
					value: velocity(motorRightWheelState.velocity.value),
					date: momentFormat2(motorRightWheelState.velocity.updatedAt),
					icon: 'speed'
				}
			);
		case 'motorRightWheelState.controllerTemperature':
			return (
				motorRightWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.CONTROLLER_TEMPERATURE',
					value: temperature(motorRightWheelState.controllerTemperature.value),
					date: momentFormat2(motorRightWheelState.controllerTemperature.updatedAt),
					icon: 'title'
				}
			);
		case 'motorRightWheelState.controllerVoltage':
			return (
				motorRightWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.CONTROLLER_VOLTAGE',
					value: voltage(motorRightWheelState.controllerVoltage.value),
					date: momentFormat2(motorRightWheelState.controllerVoltage.updatedAt),
					icon: 'flash_on'
				}
			);
		case 'motorRightWheelState.lastErrorCode':
			return (
				motorRightWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.LAST_ERROR_CODE',
					value: motorRightWheelState.lastErrorCode.value,
					date: momentFormat2(motorRightWheelState.lastErrorCode.updatedAt),
					icon: 'warning'
				}
			);
		case 'motorRightWheelState.motorCurrent':
			return (
				motorRightWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.MOTOR_CURRENT',
					value: current(motorRightWheelState.motorCurrent.value),
					date: momentFormat2(motorRightWheelState.motorCurrent.updatedAt),
					icon: 'flash_auto'
				}
			);
		case 'motorRightWheelState.velocity':
			return (
				motorRightWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.VELOCITY',
					value: velocity(motorRightWheelState.velocity.value),
					date: momentFormat2(motorRightWheelState.velocity.updatedAt),
					icon: 'speed'
				}
			);
		case 'motorRightWheelState.position':
			return (
				motorRightWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.POSITION',
					value: motorRightWheelState.position.value.toFixed(3),
					date: momentFormat2(motorRightWheelState.position.updatedAt),
					icon: 'room'
				}
			);
		default:
		case 'motorRightWheelState.status':
			return (
				motorRightWheelState && {
					title: 'CONTENT.DETAIL.STATES.MOTOR_WHEEL.ITEMS.STATUS',
					value: motorRightWheelState.status.value,
					date: momentFormat2(motorRightWheelState.status.updatedAt),
					icon: 'new_releases'
				}
			);
	}
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

/**
 * velocity
 * @param value
 * @param precision
 * @returns
 */
const velocity = (value: number, precision = 1) => {
	let result;
	try {
		result = value.toFixed(precision);
	} catch (error) {
		result = value;
	}
	return `${result} rad/s`;
};

/**
 * number
 * @param value
 * @param precision
 * @returns
 */
const temperature = (value: number, precision = 1) => {
	let result;
	try {
		result = value.toFixed(precision);
	} catch (error) {
		result = value;
	}
	return `${result}°`;
};
