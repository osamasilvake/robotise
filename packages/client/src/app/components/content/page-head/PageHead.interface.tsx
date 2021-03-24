export interface PageHeadInterface {
	title: string;
	description?: string;
	updatePageLabel?: string;
	hideDivider?: boolean;
}

export interface BreadcrumbInterface {
	text: string;
	link: string;
	isLast: boolean;
}
