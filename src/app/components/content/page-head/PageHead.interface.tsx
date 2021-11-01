import { BreadcrumbLabelsInterface } from '../../common/breadcrumb/Breadcrumb.interface';

export interface PageHeadInterface {
	title: string;
	description?: string;
	onlyMeta?: boolean;
	labels?: BreadcrumbLabelsInterface;
}
