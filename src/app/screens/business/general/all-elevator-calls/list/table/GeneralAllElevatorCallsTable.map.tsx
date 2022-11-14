import {
	StatusTypeEnum,
	StatusTypeTextEnum
} from '../../../../../../components/common/status/Status.enum';
import { AECDataInterface } from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import {
	GeneralAllElevatorCallsTableColumnHistoryEventTypeEnum,
	GeneralAllElevatorCallsTableColumnStatusTypeEnum
} from './GeneralAllElevatorCallsTable.enum';

/**
 * map elevator call
 * @param elevatorCall
 * @returns
 */
export const mapElevatorCall = (elevatorCall: AECDataInterface) => {
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
		case GeneralAllElevatorCallsTableColumnStatusTypeEnum.PROGRESS:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case GeneralAllElevatorCallsTableColumnStatusTypeEnum.CREATED:
		case GeneralAllElevatorCallsTableColumnStatusTypeEnum.SUCCESS:
			return StatusTypeEnum.SUCCESS_DARK;
		case GeneralAllElevatorCallsTableColumnStatusTypeEnum.FAILED:
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
		case GeneralAllElevatorCallsTableColumnHistoryEventTypeEnum.ERROR:
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
