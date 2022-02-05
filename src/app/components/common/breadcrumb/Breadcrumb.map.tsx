import { AppConfigService } from '../../../services';
import {
	strCapitalLetterAndCamelCaseToDash,
	strRemoveSymbols
} from '../../../utilities/methods/String';
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
			isLast: false
		},
		...paths.map((path, index) => ({
			text: strRemoveSymbols(strCapitalLetterAndCamelCaseToDash(path)),
			link: `/${paths.slice(0, index + 1).join('/')}`,
			isLast: index === paths.length - 1
		}))
	];
};
