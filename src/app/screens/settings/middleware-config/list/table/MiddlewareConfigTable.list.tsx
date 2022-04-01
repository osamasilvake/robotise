import { MiddlewareConfigTableColumnsTypeEnum } from './MiddlewareConfigTable.enum';
import { MiddlewareConfigTableColumnInterface } from './MiddlewareConfigTable.interface';

const translation = 'LIST.TABLE.COLUMNS';
export const columns: MiddlewareConfigTableColumnInterface[] = [
	{
		id: MiddlewareConfigTableColumnsTypeEnum.KEY,
		label: `${translation}.KEY`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.PROP,
		label: `${translation}.PROP`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.DIRECTION,
		label: `${translation}.DIRECTION`,
		minWidth: 150,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.AUDIT,
		label: `${translation}.AUDIT`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.DEBUG,
		label: `${translation}.DEBUG`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.SAVE_HISTORY,
		label: `${translation}.SAVE_HISTORY`,
		minWidth: 140,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.STOP_PROPAGATE,
		label: `${translation}.STOP_PROPAGATE`,
		minWidth: 200,
		align: 'right'
	}
];
