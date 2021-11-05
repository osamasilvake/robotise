import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppConfigService } from '../../../../../services';
import {
	ISite,
	SSContentInterface
} from '../../../../../slices/business/sites/Sites.slice.interface';
import { momentSort } from '../../../../../utilities/methods/Moment';
import { SitesTableColumnsTypeEnum, SitesTableSortTypeEnum } from './SitesTable.enum';
import { SitesTableBodyInterface, SitesTableColumnInterface } from './SitesTable.interface';
import { columns } from './SitesTable.list';
import SitesTableBodyCell from './SitesTableBodyCell';

const SitesTableBody: FC<SitesTableBodyInterface> = (props) => {
	const { content, order, orderBy } = props;

	const navigate = useNavigate();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SSContentInterface): ISite[] => {
		let type;
		switch (orderBy) {
			case SitesTableColumnsTypeEnum.UPDATED_AT:
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
			switch (type) {
				case SitesTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
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
	 * handle show site detail
	 * @param site
	 * @returns
	 */
	const handleShowSiteDetail = (siteTwins: ISite) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.DETAIL;
		const link = url.replace(':siteId', siteTwins.id);

		// navigate
		navigate(link);
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content).map((siteTwins: ISite) => (
					<TableRow
						hover
						key={siteTwins.id}
						tabIndex={-1}
						onClick={handleShowSiteDetail(siteTwins)}>
						{columns.map((column: SitesTableColumnInterface) => (
							<SitesTableBodyCell key={column.id} column={column} site={siteTwins} />
						))}
					</TableRow>
				))}
		</TableBody>
	);
};
export default SitesTableBody;
