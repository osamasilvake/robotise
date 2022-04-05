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
		id: MiddlewareConfigTableColumnsTypeEnum.DIRECTION,
		label: `${translation}.DIRECTION`,
		minWidth: 110,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.AUDIT,
		label: `${translation}.AUDIT`,
		minWidth: 70,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.DEBUG,
		label: `${translation}.DEBUG`,
		minWidth: 70,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.SAVE_HISTORY,
		label: `${translation}.SAVE_HISTORY`,
		minWidth: 140,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.STOP_PROPAGATE,
		label: `${translation}.STOP_PROPAGATE`,
		minWidth: 160,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 80,
		align: 'left'
	},
	{
		id: MiddlewareConfigTableColumnsTypeEnum.ACTIONS,
		label: `${translation}.ACTIONS`,
		minWidth: 130,
		align: 'right',
		noSort: true
	}
];

// directions
export const MiddlewareConfigDirections = [
	{ id: 'roc', name: 'ROC' },
	{ id: 'robot', name: 'Robot' }
];

// statuses
export const MiddlewareConfigStatuses = [
	{ id: 'inactive', name: 'InActive' },
	{ id: 'active', name: 'Active' }
];

// trace modes
export const MiddlewareConfigTraceModes = [
	{ id: 'traceStd', name: 'traceStd' },
	{ id: 'traceAll', name: 'traceAll' }
];
