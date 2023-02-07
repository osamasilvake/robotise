import { RobotElevatorCallsTableColumnsTypeEnum } from './RobotElevatorCallsTable.enum';
import { RobotElevatorCallsTableColumnInterface } from './RobotElevatorCallsTable.interface';

const translation = 'COMMON.ELEVATOR_CALLS.LIST.TABLE.COLUMNS';
export const columns: RobotElevatorCallsTableColumnInterface[] = [
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.API_STATUS,
		label: `${translation}.API_STATUS`,
		minWidth: 130,
		align: 'left'
	},
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.E2E_STATUS,
		label: `${translation}.E2E_STATUS`,
		minWidth: 130,
		align: 'left'
	},
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.CALL_TYPE,
		label: `${translation}.CALL_TYPE`,
		minWidth: 120,
		align: 'left'
	},
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.VENDOR,
		label: `${translation}.VENDOR`,
		minWidth: 120,
		align: 'left'
	},
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.SRC_AREA_ID,
		label: `${translation}.SRC_AREA_ID`,
		minWidth: 110,
		align: 'left'
	},
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.DST_AREA_ID,
		label: `${translation}.DST_AREA_ID`,
		minWidth: 110,
		align: 'left'
	},
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 330,
		align: 'left',
		noSort: true
	},
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.ELEVATOR_LOGS,
		label: `${translation}.ELEVATOR_LOGS`,
		minWidth: 150,
		align: 'right'
	}
];
