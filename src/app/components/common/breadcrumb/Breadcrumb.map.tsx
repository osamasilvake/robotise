import { AppConfigService } from '../../../services';
import { strCapitalLetterAndCamelCaseToDash } from '../../../utilities/methods/String';
import { BreadcrumbLinksInterface } from './Breadcrumb.interface';

/**
 * create breadcrumbs from the link
 * @returns
 */
export const breadcrumbs = (): BreadcrumbLinksInterface[] => {
	const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
	const url = location.origin + location.pathname;
	const paths = url.replace(skipLastSlashes, '').split('/').slice(3);
	return [
		{
			text: 'DASHBOARD.TITLE',
			link: AppConfigService.AppRoutes.HOME,
			isLast: !paths.length,
			show: !!paths.length
		},
		...paths.map((path, index) => ({
			text: strCapitalLetterAndCamelCaseToDash(path),
			link: `/${paths.slice(0, index + 1).join('/')}`,
			isLast: index === paths.length - 1,
			show: true
		}))
	];
};
