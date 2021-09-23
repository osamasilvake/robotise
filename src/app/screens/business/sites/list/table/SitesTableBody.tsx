import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

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

	const history = useHistory();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SSContentInterface): ISite[] => {
		let type;
		switch (orderBy) {
			case columns[4].id:
				type = SitesTableSortTypeEnum.DATE;
				break;
			case columns[3].id:
				type = SitesTableSortTypeEnum.BOOLEAN;
				break;
			case columns[0].id:
			case columns[1].id:
			case columns[2].id:
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
					return String(a[key]).localeCompare(String(b[key]));
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
		const siteLink = url.replace(':siteId', siteTwins.id);

		// push to history
		history.push(siteLink);
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
