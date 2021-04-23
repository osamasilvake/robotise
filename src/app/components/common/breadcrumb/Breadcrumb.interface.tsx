export interface BreadcrumbParamsInterface {
	robot?: string;
	order?: string;
}

export interface BreadcrumbInterface {
	labels: BreadcrumbLabelsInterface | null;
}

export interface BreadcrumbLabelsInterface {
	robotName?: string;
	orderRoom?: string;
}

export interface BreadcrumbLinksInterface {
	text: string;
	link?: string;
	isLast: boolean;
}
