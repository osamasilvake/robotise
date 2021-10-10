import {
	HistoryStatusTypeEnum,
	StatusTypeEnum
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
	const translation = 'CONTENT.ELEVATOR_CALLS.LIST.TABLE.VALUES';
	return {
		...elevatorCall,
		history: elevatorCall.history.map((item) => ({
			...item,
			event: `${translation}.HISTORY.EVENT.${item.event}`
		}))
	};
};

/**
 * map status level
 * @param status
 * @returns
 */
export const mapStatusLevel = (status: string) => {
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
 * @param status
 * @returns
 */
export const mapHistoryEventType = (event: string) => {
	switch (event.toLowerCase()) {
		case RobotElevatorCallsTableColumnHistoryEventTypeEnum.ERROR:
			return {
				color: HistoryStatusTypeEnum.ERROR,
				icon: 'cancel_outlined'
			};
		default:
			return {
				color: HistoryStatusTypeEnum.INFO,
				icon: 'info_outlined'
			};
	}
};
