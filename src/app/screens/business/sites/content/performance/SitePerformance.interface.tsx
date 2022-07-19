import { Dispatch, SetStateAction } from 'react';

import { SPCDataInterface } from '../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { JsonAPIResponseInterface } from '../../../../../slices/JsonAPI.interface';
import { PerformancePeriodTypeEnum } from './period/SitePerformancePeriod.enum';

export interface PerformancePeriodListInterface {
	id: PerformancePeriodTypeEnum;
	label: string;
}

export interface PerformanceChartsInterface {
	performancePeriod: PerformancePeriodListInterface[];
	currentPeriod: PerformancePeriodTypeEnum;
	setCurrentPeriod: Dispatch<SetStateAction<PerformancePeriodTypeEnum>>;
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
