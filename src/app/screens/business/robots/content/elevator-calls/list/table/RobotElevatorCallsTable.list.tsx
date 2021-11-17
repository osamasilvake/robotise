import { RobotElevatorCallsTableColumnsTypeEnum } from './RobotElevatorCallsTable.enum';
import { RobotElevatorCallsTableColumnInterface } from './RobotElevatorCallsTable.interface';

const translation = 'CONTENT.ELEVATOR_CALLS.LIST.TABLE.COLUMNS';
export const columns: RobotElevatorCallsTableColumnInterface[] = [
	{
		id: RobotElevatorCallsTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
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
