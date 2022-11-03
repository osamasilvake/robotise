export interface BreadcrumbInterface {
	labels: string[] | undefined;
	disableGeneralTab?: string;
}

export interface BreadcrumbLinksInterface {
	text: string;
	link?: string;
	isLast: boolean;
	show: boolean;
}
