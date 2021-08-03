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
			 * 1. siteId
			 * 2. robotId
			 * 3. orderId
			 * 4. purchaseId
			 */
			if (path === params.siteId) {
				return {
					text: labels?.siteName || '...',
					link,
					isLast: index === paths.length - 1
				};
			} else if (path === params.robotId) {
				return {
					text: labels?.robotName || '...',
					link,
					isLast: index === paths.length - 1
				};
			} else if (path === params.orderId) {
				return {
					text: labels?.orderTarget || '',
					link,
					isLast: index === paths.length - 1
				};
			} else if (path === params.purchaseId) {
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
