import { Dispatch, SetStateAction } from 'react';

import { SPCDataInterface } from '../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { JsonAPIResponseInterface } from '../../../../../slices/JsonAPI.interface';
import { PerformanceChartPeriodTypeEnum } from './charts/SitePerformanceCharts.enum';

export interface PerformancePeriodListInterface {
	id: PerformanceChartPeriodTypeEnum;
	label: string;
}

export interface PerformancePeriodInterface {
	performancePeriod: PerformancePeriodListInterface[];
	currentPeriod: PerformanceChartPeriodTypeEnum;
	setCurrentPeriod: Dispatch<SetStateAction<PerformanceChartPeriodTypeEnum>>;
}

export interface PerformancePurchasesPayloadInterface {
	from: number;
}

export interface PerformancePurchasesAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SPCDataInterface;
	}[];
}
