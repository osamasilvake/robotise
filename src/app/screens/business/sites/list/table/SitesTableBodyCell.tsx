import { Check, Close, Description, VisibilityOff } from '@mui/icons-material';
import { Box, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import { AppDispatch } from '../../../../../slices';
import { GeneralCopyToClipboard } from '../../../../../slices/business/general/GeneralOperations.slice';
import { ISite } from '../../../../../slices/business/sites/Sites.slice.interface';
import { dateFormat1 } from '../../../../../utilities/methods/Date';
import { SitesTableColumnsTypeEnum } from './SitesTable.enum';
import { SitesTableBodyCellInterface, SitesTableColumnInterface } from './SitesTable.interface';
import { SitesListStyle } from './SitesTable.style';

const SitesTableBodyCell: FC<SitesTableBodyCellInterface> = (props) => {
	const { column, site } = props;
	const classes = SitesListStyle();

	const dispatch = useDispatch<AppDispatch>();

	/**
	 * set cell value
	 * @param site
	 * @param column
	 * @returns
	 */
	const setCellValue = (site: ISite, column: SitesTableColumnInterface) => {
		if (column.id === SitesTableColumnsTypeEnum.SITE_ID) {
			return (
				<Box onClick={(e) => dispatch(GeneralCopyToClipboard(site.id, e))}>
					<Tooltip title={site.id}>
						<Description color="action" fontSize="small" />
					</Tooltip>
				</Box>
			);
		} else {
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
		}
	};

	return (
		<TableCell key={column.id} align={column.align} style={{ padding: column?.padding }}>
			<>{setCellValue(site, column)}</>
		</TableCell>
	);
};
export default SitesTableBodyCell;
