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
	orderTarget?: string;
	purchaseTarget?: string;
}

export interface BreadcrumbLinksInterface {
	text: string;
	link?: string;
	isLast: boolean;
}
