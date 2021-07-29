import { Box, Chip, TableCell } from '@material-ui/core';
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../services';
import { SPCDataInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import {
	RobotPurchasesTableBodyCellInterface,
	RobotPurchasesTableColumnInterface
} from '../../../purchases/list/table/RobotPurchasesTable.interface';
import { columns } from './RobotPurchasesTable.list';
import { RobotPurchasesTableStyle } from './RobotPurchasesTable.style';
import TableFieldComment from './TableFieldComment';

const RobotPurchasesTableBodyCell: FC<RobotPurchasesTableBodyCellInterface> = (props) => {
	const { purchase, column } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesTableStyle();

	/**
	 * set cell value
	 * @param purchase
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		purchase: SPCDataInterface,
		column: RobotPurchasesTableColumnInterface
	) => {
		const value = purchase[column.id];
		if (columns[0].id === column.id) {
			return (
				<Box>
					{value || AppConfigService.AppOptions.common.none}
					{!purchase['isBilled'] && (
						<Box component="span" className={classes.sTarget}>
							<Chip
								size="small"
								label={t(`CONTENT.PURCHASES.LIST.TABLE.VALUES.UN_BILLED`)}
							/>
						</Box>
					)}
				</Box>
			);
		} else if (columns[1].id === column.id) {
			return momentFormat1(value);
		} else if (columns[2].id === column.id) {
			const price = Number(value);
			return price > 0
				? `${currencyFormat(
						price,
						purchase['currency'] || AppConfigService.AppOptions.common.defaultCurrency,
						i18next.language
				  )}`
				: 0;
		} else if (columns[3].id === column.id) {
			return <TableFieldComment purchase={purchase} />;
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(purchase, column)}
		</TableCell>
	);
};
export default RobotPurchasesTableBodyCell;
