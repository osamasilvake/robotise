export interface BreadcrumbParamsInterface {
	site?: string;
	robot?: string;
	order?: string;
	purchase?: string;
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
