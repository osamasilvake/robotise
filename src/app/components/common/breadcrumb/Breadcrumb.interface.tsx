export interface BreadcrumbInterface {
	labels: string[] | undefined;
}

export interface BreadcrumbLinksInterface {
	text: string;
	link?: string;
	isLast: boolean;
	show: boolean;
}
