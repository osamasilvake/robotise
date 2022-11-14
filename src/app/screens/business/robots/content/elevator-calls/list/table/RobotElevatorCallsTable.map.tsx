import {
	StatusTypeEnum,
	StatusTypeTextEnum
} from '../../../../../../../components/common/status/Status.enum';
import { ECCDataInterface } from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import {
	RobotElevatorCallsTableColumnHistoryEventTypeEnum,
	RobotElevatorCallsTableColumnStatusTypeEnum
} from './RobotElevatorCallsTable.enum';

/**
 * map elevator call
 * @param elevatorCall
 * @returns
 */
export const mapElevatorCall = (elevatorCall: ECCDataInterface) => {
	const translation = 'COMMON.ELEVATOR_CALLS.LIST.TABLE.VALUES';
	return {
		...elevatorCall,
		history: elevatorCall.history.map((item) => ({
			...item,
			event: `${translation}.HISTORY.EVENT.${item.event}`
		}))
	};
};

/**
 * map status
 * @param status
 * @returns
 */
export const mapStatus = (status: string) => {
	const value = status && status.split('.').pop();
	switch (value) {
		case RobotElevatorCallsTableColumnStatusTypeEnum.PROGRESS:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case RobotElevatorCallsTableColumnStatusTypeEnum.CREATED:
		case RobotElevatorCallsTableColumnStatusTypeEnum.SUCCESS:
			return StatusTypeEnum.SUCCESS_DARK;
		case RobotElevatorCallsTableColumnStatusTypeEnum.FAILED:
			return StatusTypeEnum.ERROR;
		default:
			return StatusTypeEnum.INFO;
	}
};

/**
 * map history event type
 * @param event
 * @returns
 */
export const mapHistoryEventType = (event: string) => {
	switch (event) {
		case RobotElevatorCallsTableColumnHistoryEventTypeEnum.ERROR:
			return {
				color: StatusTypeTextEnum.ERROR,
				icon: 'cancel_outlined'
			};
		default:
			return {
				color: StatusTypeTextEnum.INFO,
				icon: 'info_outlined'
			};
	}
};
