import { TableBody, TableRow } from '@material-ui/core';
import { FC } from 'react';

import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/products/Products.slice.interface';
import { momentSort } from '../../../../../../../utilities/methods/Moment';
import {
	SiteProductsTableColumnsTypeEnum,
	SiteProductsTableSortTypeEnum
} from './SiteProductsTable.enum';
import {
	SiteProductsTableBodyInterface,
	SiteProductsTableColumnInterface
} from './SiteProductsTable.interface';
import { columns } from './SiteProductsTable.list';
import SiteProductsTableBodyCell from './SiteProductsTableBodyCell';

const SiteProductsTableBody: FC<SiteProductsTableBodyInterface> = (props) => {
	const { content, order, orderBy } = props;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SPContentInterface): SPCDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[2].id:
			case columns[3].id:
			case columns[4].id:
				type = SiteProductsTableSortTypeEnum.NUMBER;
				break;
			case columns[6].id:
				type = SiteProductsTableSortTypeEnum.DATE;
				break;
			case columns[1].id:
			case columns[5].id:
				type = SiteProductsTableSortTypeEnum.STRING;
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
	const sortByProperty = (
		key: SiteProductsTableColumnsTypeEnum,
		type: SiteProductsTableSortTypeEnum
	) => {
		return (a: SPCDataInterface, b: SPCDataInterface) => {
			if (key !== SiteProductsTableColumnsTypeEnum.ACTIONS) {
				switch (type) {
					case SiteProductsTableSortTypeEnum.NUMBER:
						return Number(a[key]) - Number(b[key]);
					case SiteProductsTableSortTypeEnum.DATE:
						return momentSort(a[key]).diff(momentSort(b[key]));
					case SiteProductsTableSortTypeEnum.STRING:
					default:
						return String(a[key]).localeCompare(String(b[key]));
				}
			}
			return 1;
		};
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content).map((product: SPCDataInterface) => (
					<TableRow key={product.id} tabIndex={-1}>
						{columns.map((column: SiteProductsTableColumnInterface) => (
							<SiteProductsTableBodyCell
								key={column.id}
								column={column}
								product={product}
							/>
						))}
					</TableRow>
				))}
		</TableBody>
	);
};
export default SiteProductsTableBody;
