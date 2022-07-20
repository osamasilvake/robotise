export interface SlicePerformanceInterface {
	purchases: {
		loader: boolean;
		loading: boolean;
		content: SPContentInterface | null;
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
