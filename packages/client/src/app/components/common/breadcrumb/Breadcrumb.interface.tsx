export interface BreadcrumbInterface {
	title: string;
	currentLabel: string | undefined;
}

export interface BreadcrumbLinksInterface {
	text: string;
	link?: string;
	isLast: boolean;
}
