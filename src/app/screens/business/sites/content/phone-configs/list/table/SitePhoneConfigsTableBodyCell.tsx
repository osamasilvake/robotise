import { VolumeUp } from '@mui/icons-material';
import { Box, Link, TableCell } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PCCDataInterface } from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';
import {
	SitePhoneConfigsTableBodyCellInterface,
	SitePhoneConfigsTableColumnInterface
} from './SitePhoneConfigsTable.interface';
import { columns } from './SitePhoneConfigsTable.list';
import { mapPhoneConfig } from './SitePhoneConfigsTable.map';
import { SitePhoneConfigsTableStyle } from './SitePhoneConfigsTable.style';

const SitePhoneConfigsTableBodyCell: FC<SitePhoneConfigsTableBodyCellInterface> = (props) => {
	const { column, phoneConfig } = props;
	const { t } = useTranslation('SITES');
	const classes = SitePhoneConfigsTableStyle();

	/**
	 * set cell value
	 * @param phoneConfig
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		phoneConfig: PCCDataInterface,
		column: SitePhoneConfigsTableColumnInterface
	) => {
		const value = mapPhoneConfig(phoneConfig)[column.id];
		if (typeof value === 'object') {
			return value.map((item) => (
				<Box key={item.key} className={classes.sMessages}>
					<VolumeUp fontSize="small" />
					<Link underline="hover" href={item.value} target="_blank">
						{t(item.key)}
					</Link>
				</Box>
			));
		} else if (typeof value === 'string') {
			if (columns[2].id === column.id || columns[3].id === column.id) {
				return (
					<Link underline="hover" href={`tel:${t(value)}`}>
						{t(value)}
					</Link>
				);
			}
			return t(value);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(phoneConfig, column)}
		</TableCell>
	);
};
export default SitePhoneConfigsTableBodyCell;
