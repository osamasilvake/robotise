import { RobotsSliceResponseAllAlertsInterface } from '../../../../slices/robots/Robots.slice.interface';
import { momentFormat1 } from '../../../../utilities/methods/Moment';
import { RobotsListTableColumnInterface } from './RobotsList.interface';

export const columns: RobotsListTableColumnInterface[] = [
	{
		id: 'name',
		label: 'Name',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'siteTitle',
		label: 'Site',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'isReady',
		label: 'Status',
		minWidth: 170,
		align: 'center',
		format: (value: boolean) => (value ? 'On' : 'Off')
	},
	{
		id: 'updatedAt',
		label: 'Updated At',
		minWidth: 170,
		align: 'center',
		format: (value: string) => momentFormat1(value)
	},
	{
		id: 'alerts',
		label: 'Alerts (danger / warning)',
		minWidth: 170,
		align: 'right',
		format: (value: RobotsSliceResponseAllAlertsInterface) => `${value.danger}/${value.warning}`
	}
];
