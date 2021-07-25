export interface BreadcrumbParamsInterface {
	siteId?: string;
	robotId?: string;
	orderId?: string;
	purchaseId?: string;
}

export interface BreadcrumbInterface {
	labels: BreadcrumbLabelsInterface | null;
}

export interface BreadcrumbLabelsInterface {
	siteName?: string;
	robotName?: string;
	orderTarget?: string;
	purchaseTarget?: string;
}

export interface BreadcrumbLinksInterface {
	text: string;
	link?: string;
	isLast: boolean;
}
