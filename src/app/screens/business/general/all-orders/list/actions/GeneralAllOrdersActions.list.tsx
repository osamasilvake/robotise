import { GeneralAllOrdersPeriodTypeEnum } from './GeneralAllOrdersActions.enum';
import { GeneralAllOrdersPeriodListInterface } from './GeneralAllOrdersActions.interface';

export const generalAllOrdersPeriod: GeneralAllOrdersPeriodListInterface[] = [
	{
		id: GeneralAllOrdersPeriodTypeEnum.HR24,
		label: 'PERIOD.24HR',
		period: 24
	},
	{
		id: GeneralAllOrdersPeriodTypeEnum.DAY,
		label: 'PERIOD.DAY',
		period: 7
	}
];
