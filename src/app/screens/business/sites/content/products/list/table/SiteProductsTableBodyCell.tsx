import { Avatar, TableCell } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SPCDataInterface } from '../../../../../../../slices/products/Products.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import {
	SiteProductsTableBodyCellInterface,
	SiteProductsTableColumnInterface
} from './SiteProductsTable.interface';
import { columns } from './SiteProductsTable.list';

const SiteProductsTableBodyCell: FC<SiteProductsTableBodyCellInterface> = (props) => {
	const { column, order } = props;
	const { t } = useTranslation('SITES');

	/**
	 * set cell value
	 * @param site
	 * @param column
	 * @returns
	 */
	const setCellValue = (order: SPCDataInterface, column: SiteProductsTableColumnInterface) => {
		const value = order[column.id];
		if (typeof value === 'number') {
			return value;
		} else if (columns[0].id === column.id) {
			return <Avatar variant="square" src={value} alt={order['name']} />;
		} else if (columns[5].id === column.id) {
			return momentFormat1(value);
		}
		return t(value);
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(order, column)}
		</TableCell>
	);
};
export default SiteProductsTableBodyCell;
