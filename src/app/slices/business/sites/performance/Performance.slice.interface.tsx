import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SitePerformancePeriodListInterface } from '../../../../screens/business/sites/content/performance/period/SitePerformancePeriod.interface';

export interface SlicePerformanceInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: SPContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SPContentInterface {
	purchases: SPContentPurchasesInterface;
	orders: SPContentOrdersInterface;
	inventory: SPContentInventoryInterface;
	topProducts: SPContentTopProductsInterface;
	state?: SPContentStateInterface;
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

export interface SPContentOrdersInterface {
	statistics: {
		histogram: SPContentOrdersHistogramInterface;
		single: SPContentOrdersSingleInterface;
	};
}

export interface SPContentOrdersHistogramInterface {
	ordersPerPeriod: {
		buckets: {
			key: Date;
			orderModes: {
				docCount: number;
				key: string;
			}[];
			totalOrders: number;
		}[];
	};
}

export interface SPContentOrdersSingleInterface {
	avgOrderModes: {
		buckets: {
			docCount: number;
			key: string;
		}[];
	};
	totalOrderModes: {
		buckets: {
			docCount: number;
			key: string;
		}[];
	};
}

export interface SPContentTopProductsInterface {
	statistics: {
		topQuantity: SPContentTopProductsBucketsInterface;
		topTotalPrice: SPContentTopProductsBucketsInterface;
		topOrders: SPContentTopProductsBucketsInterface;
	};
}

export interface SPContentTopProductsBucketsInterface {
	buckets: SPContentTopProductsBucketInterface[];
}

export interface SPContentTopProductsBucketInterface {
	productId: string;
	productData: SPContentTopProductsBucketDataInterface;
	totalQuantity: number;
	totalPrice: number;
	totalOrders: number;
}

export interface SPContentTopProductsBucketDataInterface {
	id: string;
	image: string;
	name: string;
	length: number;
	weight: number;
	volume: string;
	price: number;
	isDeleted: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface SPContentStateInterface {
	pSiteId?: string;
	currentPeriod?: SitePerformancePeriodListInterface;
}
