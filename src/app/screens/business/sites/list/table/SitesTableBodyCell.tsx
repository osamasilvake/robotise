import { Check, Close, VisibilityOff } from '@mui/icons-material';
import { Box, Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';

import { AppConfigService } from '../../../../../services';
import { ISite } from '../../../../../slices/business/sites/Sites.slice.interface';
import { dateFormat1 } from '../../../../../utilities/methods/Date';
import { SitesTableColumnsTypeEnum } from './SitesTable.enum';
import { SitesTableBodyCellInterface, SitesTableColumnInterface } from './SitesTable.interface';
import { SitesListStyle } from './SitesTable.style';

const SitesTableBodyCell: FC<SitesTableBodyCellInterface> = (props) => {
	const { column, site } = props;
	const classes = SitesListStyle();

	/**
	 * set cell value
	 * @param site
	 * @param column
	 * @returns
	 */
	const setCellValue = (site: ISite, column: SitesTableColumnInterface) => {
		const value = site[column.id];
		if (SitesTableColumnsTypeEnum.CURRENCY === column.id) {
			return value || AppConfigService.AppOptions.common.currencies[0].id;
		} else if (SitesTableColumnsTypeEnum.ACCEPT_ORDER === column.id) {
			return (
				<Box>
					{site.acceptOrders ? <Check color="secondary" /> : <Close color="error" />}
				</Box>
			);
		} else if (SitesTableColumnsTypeEnum.UPDATED === column.id) {
			return dateFormat1(String(value));
		} else if (SitesTableColumnsTypeEnum.SITE_TITLE === column.id) {
			return (
				<Stack direction="row" alignItems="center">
					<Typography variant="body2">
						{String(value) || AppConfigService.AppOptions.common.none}
					</Typography>
					{!!site.configs?.isHidden && (
						<VisibilityOff fontSize="small" className={classes.sTableIcon} />
					)}
				</Stack>
			);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			<>{setCellValue(site, column)}</>
		</TableCell>
	);
};
export default SitesTableBodyCell;
