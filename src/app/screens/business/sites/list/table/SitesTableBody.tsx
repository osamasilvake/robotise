import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppConfigService } from '../../../../../services';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import {
	ISite,
	SSContentInterface
} from '../../../../../slices/business/sites/Sites.slice.interface';
import { dateSort } from '../../../../../utilities/methods/Date';
import { SitesTableColumnsTypeEnum, SitesTableSortTypeEnum } from './SitesTable.enum';
import { SitesTableBodyInterface, SitesTableColumnInterface } from './SitesTable.interface';
import { columns } from './SitesTable.list';
import SitesTableBodyCell from './SitesTableBodyCell';

const SitesTableBody: FC<SitesTableBodyInterface> = (props) => {
	const { content, order, orderBy } = props;

	const sites = useSelector(sitesSelector);

	const navigate = useNavigate();

	const showHidden = !!sites.content?.state?.showHidden;
	const searchText = sites.content?.state?.searchText || '';

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SSContentInterface): ISite[] => {
		let type;
		switch (orderBy) {
			case SitesTableColumnsTypeEnum.UPDATED:
				type = SitesTableSortTypeEnum.DATE;
				break;
			case SitesTableColumnsTypeEnum.ACCEPT_ORDER:
				type = SitesTableSortTypeEnum.BOOLEAN;
				break;
			case SitesTableColumnsTypeEnum.SITE_TITLE:
			case SitesTableColumnsTypeEnum.TIMEZONE:
			case SitesTableColumnsTypeEnum.CURRENCY:
				type = SitesTableSortTypeEnum.STRING;
				break;
			default:
				return content.data;
		}
		const result = content.data.concat().sort(sortByProperty(orderBy, type));
		return order === 'desc' ? result.reverse() : result;
	};

	/**
	 * sort by property
	 * @param key
	 * @param type
	 * @returns
	 */
	const sortByProperty = (key: SitesTableColumnsTypeEnum, type: SitesTableSortTypeEnum) => {
		return (a: ISite, b: ISite) => {
			const cond1 = key === SitesTableColumnsTypeEnum.ID;
			if (cond1) return 1;

			const dateA = a[SitesTableColumnsTypeEnum.UPDATED];
			const dateB = b[SitesTableColumnsTypeEnum.UPDATED];
			switch (type) {
				case SitesTableSortTypeEnum.DATE:
					return dateSort(dateA).diff(dateSort(dateB));
				case SitesTableSortTypeEnum.BOOLEAN:
					return a[key] ? -1 : 1;
				case SitesTableSortTypeEnum.STRING:
				default:
					return a[key] && b[key]
						? String(a[key]).localeCompare(String(b[key]))
						: a[key]
						? 1
						: -1;
			}
		};
	};

	/**
	 * filter sites
	 * @returns
	 */
	const filterSites = () => {
		let list = (content && content.data && sortTableData(content)) || [];
		if (searchText) {
			list = list?.filter((r) => {
				const search = searchText?.toLowerCase()?.trim();
				const siteId = r.id?.toLowerCase() || '';
				const siteTitle = r.title?.toLowerCase() || '';
				const cond1 = siteId.indexOf(search) !== -1;
				const cond2 = siteTitle.indexOf(search) !== -1;
				return cond1 || cond2;
			});
		}

		return list.filter((r) => showHidden || (!showHidden && !r.configs.isHidden));
	};

	/**
	 * handle show site detail
	 * @param site
	 * @returns
	 */
	const handleShowSiteDetail = (site: ISite) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.DETAIL;
		const link = url.replace(':siteId', site.id);

		// navigate
		navigate(link);
	};

	return (
		<TableBody>
			{filterSites().map((site: ISite) => (
				<TableRow hover key={site.id} tabIndex={-1} onClick={handleShowSiteDetail(site)}>
					{columns.map((column: SitesTableColumnInterface) => (
						<SitesTableBodyCell key={column.id} column={column} site={site} />
					))}
				</TableRow>
			))}
		</TableBody>
	);
};
export default SitesTableBody;
