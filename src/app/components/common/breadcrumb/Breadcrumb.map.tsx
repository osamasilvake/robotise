import { AppConfigService } from '../../../services';
import {
	strCapitalizeEachLetter,
	strRemoveSymbols
} from '../../../utilities/methods/StringUtilities';
import {
	BreadcrumbLabelsInterface,
	BreadcrumbLinksInterface,
	BreadcrumbParamsInterface
} from './Breadcrumb.interface';

/**
 * create breadcrumbs from the link
 * @param params
 * @param labels
 * @returns
 */
export const breadcrumbs = (
	params: BreadcrumbParamsInterface,
	labels: BreadcrumbLabelsInterface | null
): BreadcrumbLinksInterface[] => {
	const paths = window.location.href.split('/').slice(3);
	return [
		{
			text: 'DASHBOARD.TITLE',
			link: AppConfigService.AppRoutes.HOME,
			isLast: false
		},
		...paths.map((path, index) => {
			const link = '/' + paths.slice(0, index + 1).join('/');

			/**
			 * params:
			 * 1. site
			 * 2. robot
			 * 3. order
			 * 4. purchase
			 */
			if (path === params.site) {
				return {
					text: labels?.siteName || '...',
					link,
					isLast: index === paths.length - 1
				};
			} else if (path === params.robot) {
				return {
					text: labels?.robotName || '...',
					link,
					isLast: index === paths.length - 1
				};
			} else if (path === params.order) {
				return {
					text: labels?.orderTarget || '',
					link,
					isLast: index === paths.length - 1
				};
			} else if (path === params.purchase) {
				return {
					text: labels?.purchaseTarget || '',
					link,
					isLast: index === paths.length - 1
				};
			}

			return {
				text: strCapitalizeEachLetter(strRemoveSymbols(path)),
				link,
				isLast: index === paths.length - 1
			};
		})
	];
};
