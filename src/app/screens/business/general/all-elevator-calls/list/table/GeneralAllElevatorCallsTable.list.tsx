import { GeneralAllElevatorCallsTableColumnsTypeEnum } from './GeneralAllElevatorCallsTable.enum';
import { GeneralAllElevatorCallsTableColumnInterface } from './GeneralAllElevatorCallsTable.interface';

const translation = 'COMMON.ELEVATOR_CALLS.LIST.TABLE.COLUMNS';
export const columns: GeneralAllElevatorCallsTableColumnInterface[] = [
	{
		id: GeneralAllElevatorCallsTableColumnsTypeEnum.API_STATUS,
		label: `${translation}.API_STATUS`,
		minWidth: 130,
		align: 'left'
	},
	{
		id: GeneralAllElevatorCallsTableColumnsTypeEnum.E2E_STATUS,
		label: `${translation}.E2E_STATUS`,
		minWidth: 130,
		align: 'left'
	},
	{
		id: GeneralAllElevatorCallsTableColumnsTypeEnum.CALL_TYPE,
		label: `${translation}.CALL_TYPE`,
		minWidth: 120,
		align: 'left'
	},
	{
		id: GeneralAllElevatorCallsTableColumnsTypeEnum.SRC_AREA_ID,
		label: `${translation}.SRC_AREA_ID`,
		minWidth: 110,
		align: 'left'
	},
	{
		id: GeneralAllElevatorCallsTableColumnsTypeEnum.DST_AREA_ID,
		label: `${translation}.DST_AREA_ID`,
		minWidth: 110,
		align: 'left'
	},
	{
		id: GeneralAllElevatorCallsTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 330,
		align: 'left',
		noSort: true
	},
	{
		id: GeneralAllElevatorCallsTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: GeneralAllElevatorCallsTableColumnsTypeEnum.ELEVATOR_LOGS,
		label: `${translation}.ELEVATOR_LOGS`,
		minWidth: 150,
		align: 'right'
	}
];
