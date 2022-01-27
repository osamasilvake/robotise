import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/business/sites/products/Products.slice.interface';
import { dateSort } from '../../../../../../../utilities/methods/Date';
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
			case SiteProductsTableColumnsTypeEnum.PRICE:
			case SiteProductsTableColumnsTypeEnum.LENGTH:
			case SiteProductsTableColumnsTypeEnum.WEIGHT:
				type = SiteProductsTableSortTypeEnum.NUMBER;
				break;
			case SiteProductsTableColumnsTypeEnum.UPDATED:
				type = SiteProductsTableSortTypeEnum.DATE;
				break;
			case SiteProductsTableColumnsTypeEnum.NAME:
			case SiteProductsTableColumnsTypeEnum.SIZE:
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
				const dateA = a[SiteProductsTableColumnsTypeEnum.UPDATED];
				const dateB = b[SiteProductsTableColumnsTypeEnum.UPDATED];
				switch (type) {
					case SiteProductsTableSortTypeEnum.NUMBER:
						return a[key] && b[key] ? +a[key] - +b[key] : a[key] ? 1 : -1;
					case SiteProductsTableSortTypeEnum.DATE:
						return dateSort(dateA).diff(dateSort(dateB));
					case SiteProductsTableSortTypeEnum.STRING:
					default:
						return a[key] && b[key]
							? String(a[key]).localeCompare(String(b[key]))
							: a[key]
							? 1
							: -1;
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
					<TableRow key={product.id}>
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
