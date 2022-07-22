import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';

export interface SlicePerformanceInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: SPContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SPContentInterface {
	purchases: SPContentPurchasesInterface;
	inventory: SPContentInventoryInterface;
}

export interface SPContentPurchasesInterface {
	statistics: {
		histogram: SPContentPurchasesHistogramInterface;
		single: SPContentPurchasesSingleInterface;
	};
}

export interface SPContentPurchasesHistogramInterface {
	purchasesPerPeriod: {
		buckets: {
			key: Date;
			sumTotalPrice: number;
		}[];
	};
}

export interface SPContentPurchasesSingleInterface {
	sumTotalPrice: number;
	avgTotalPrice: number;
	avgSumTotalPricePerPeriod: number;
	avgTotalQuantity: number;
	avgPurchases: number;
	totalPurchases: number;
}

export interface SPContentInventoryInterface {
	statistics: {
		histogram: SPContentInventoryHistogramInterface;
	};
}

export interface SPContentInventoryHistogramInterface {
	inventoryPerPeriod: {
		buckets: {
			key: Date;
			avgLanesEmpty: number;
			avgLanesLow: number;
			avgLanesHigh: number;
			avgLanesFull: number;
		}[];
	};
}
