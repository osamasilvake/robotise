import { RobotDetailSafetyTableColumnsTypeEnum } from './RobotDetailSafety.enum';
import { RobotDetailSafetyColumnInterface } from './RobotDetailSafety.interface';

export const columns: RobotDetailSafetyColumnInterface[] = [
	{
		id: RobotDetailSafetyTableColumnsTypeEnum.PROTO,
		label: 'CONTENT.DETAIL.SAFETY.COMMON.TABLE.COLUMNS.PROTO',
		width: 250,
		align: 'left'
	},
	{
		id: RobotDetailSafetyTableColumnsTypeEnum.TRUE,
		label: 'CONTENT.DETAIL.SAFETY.COMMON.TABLE.COLUMNS.TRUE',
		width: 450,
		align: 'left'
	},
	{
		id: RobotDetailSafetyTableColumnsTypeEnum.FALSE,
		label: 'CONTENT.DETAIL.SAFETY.COMMON.TABLE.COLUMNS.FALSE',
		minWidth: 150,
		align: 'left'
	}
];
