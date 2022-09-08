import { Dispatch, SetStateAction } from 'react';

import { GeneralAllOrdersPeriodTypeEnum } from './GeneralAllOrdersActions.enum';

export interface GeneralAllOrdersActionsInterface {
	siteId?: string;
	currentPeriod: GeneralAllOrdersPeriodTypeEnum;
	setCurrentPeriod: Dispatch<SetStateAction<GeneralAllOrdersPeriodListInterface>>;
	includeAllOrders: boolean;
}

export interface GeneralAllOrdersSiteInterface {
	siteId?: string;
}

export interface GeneralAllOrdersSiteComboBoxInterface {
	id: string;
	label: string;
}

export interface GeneralAllOrdersPeriodInterface {
	currentPeriod: GeneralAllOrdersPeriodTypeEnum;
	setCurrentPeriod: Dispatch<SetStateAction<GeneralAllOrdersPeriodListInterface>>;
}

export interface GeneralAllOrdersPeriodListInterface {
	id: GeneralAllOrdersPeriodTypeEnum;
	label: string;
	period: number;
}

export interface GeneralAllOrdersIncludeAllOrdersInterface {
	includeAllOrders: boolean;
}
