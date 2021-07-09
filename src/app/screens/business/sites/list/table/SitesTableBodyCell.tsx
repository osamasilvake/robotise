import { Box, TableCell } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import { FC } from 'react';

import { AppConfigService } from '../../../../../services';
import { ISite } from '../../../../../slices/sites/Sites.slice.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { SitesTableBodyCellInterface, SitesTableColumnInterface } from './SitesTable.interface';
import { columns } from './SitesTable.list';

const SitesTableBodyCell: FC<SitesTableBodyCellInterface> = (props) => {
	const { column, site } = props;

	/**
	 * set cell value
	 * @param site
	 * @param column
	 * @returns
	 */
	const setCellValue = (site: ISite, column: SitesTableColumnInterface) => {
		const value = site[column.id];
		if (columns[2].id === column.id) {
			return value || AppConfigService.AppOptions.common.defaultCurrency;
		} else if (columns[3].id === column.id) {
			return (
				<Box>{site.acceptOrders ? <Check color="action" /> : <Close color="error" />}</Box>
			);
		} else if (columns[4].id === column.id) {
			return momentFormat1(value);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(site, column)}
		</TableCell>
	);
};
export default SitesTableBodyCell;
