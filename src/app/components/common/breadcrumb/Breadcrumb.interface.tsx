export interface BreadcrumbInterface {
	title: string;
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
