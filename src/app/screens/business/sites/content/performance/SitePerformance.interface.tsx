export interface SitePerformancePayloadInterface {
	lookup: { period: number; unit: string };
	robot?: string;
	site?: string;
	excludeTotalPriceZero?: boolean;
	topItems?: number;
}
