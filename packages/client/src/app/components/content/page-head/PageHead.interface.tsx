export interface PageHeadInterface {
	title: string;
	description?: string;
}

export interface BreadcrumbInterface {
	text: string;
	link: string;
	isFirst: boolean;
	isLast: boolean;
}
