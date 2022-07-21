import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';

export interface SlicePerformanceInterface {
	purchases: {
		init: boolean;
		loader: boolean;
		loading: boolean;
		content: SPContentInterface | null;
		errors: TriggerMessageInterface | null;
	};
}

export interface SPContentInterface {
	statistics: {
		histogram: SPContentHistogramInterface;
		single: SPContentSingleInterface;
	};
}

export interface SPContentHistogramInterface {
	purchasesPerPeriod: {
		buckets: {
			key: Date;
			sumTotalPrice: number;
		}[];
	};
}

export interface SPContentSingleInterface {
	sumTotalPrice: number;
	avgTotalPrice: number;
	avgSumTotalPricePerPeriod: number;
	avgTotalQuantity: number;
	avgPurchases: number;
	totalPurchases: number;
}
