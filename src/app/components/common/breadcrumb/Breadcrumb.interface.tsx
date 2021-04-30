export interface BreadcrumbParamsInterface {
	robot?: string;
	order?: string;
	purchase?: string;
}

export interface BreadcrumbInterface {
	labels: BreadcrumbLabelsInterface | null;
}

export interface BreadcrumbLabelsInterface {
	robotName?: string;
	orderRoom?: string;
	purchaseRoom?: string;
}

export interface BreadcrumbLinksInterface {
	text: string;
	link?: string;
	isLast: boolean;
}
