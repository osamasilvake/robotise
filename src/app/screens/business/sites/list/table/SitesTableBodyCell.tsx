import { Check, Close } from '@mui/icons-material';
import { Box, TableCell } from '@mui/material';
import { FC } from 'react';

import { AppConfigService } from '../../../../../services';
import { ISite } from '../../../../../slices/business/sites/Sites.slice.interface';
import { dateFormat1 } from '../../../../../utilities/methods/Date';
import { SitesTableColumnsTypeEnum } from './SitesTable.enum';
import { SitesTableBodyCellInterface, SitesTableColumnInterface } from './SitesTable.interface';

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
		if (SitesTableColumnsTypeEnum.CURRENCY === column.id) {
			return value || AppConfigService.AppOptions.common.defaultCurrency;
		} else if (SitesTableColumnsTypeEnum.ACCEPT_ORDER === column.id) {
			return (
				<Box>
					{site.acceptOrders ? <Check color="secondary" /> : <Close color="error" />}
				</Box>
			);
		} else if (SitesTableColumnsTypeEnum.UPDATED === column.id) {
			return dateFormat1(String(value));
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
