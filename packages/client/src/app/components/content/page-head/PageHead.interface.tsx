export interface PageHeadInterface {
	title: string;
	description?: string;
	hideDivider?: boolean;
}

export interface BreadcrumbInterface {
	text: string;
	link: string;
	isLast: boolean;
}
