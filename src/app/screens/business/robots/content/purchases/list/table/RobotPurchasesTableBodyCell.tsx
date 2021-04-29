import { Checkbox, TableCell } from '@material-ui/core';
import i18next from 'i18next';
import { FC } from 'react';

import { AppConfigService } from '../../../../../../../services';
import { SPCDataInterface } from '../../../../../../../slices/purchases/Purchases.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import {
	RobotPurchasesTableBodyCellInterface,
	RobotPurchasesTableColumnInterface
} from '../../../purchases/list/table/RobotPurchasesTable.interface';
import { columns } from './RobotPurchasesTable.list';
import TableFieldComment from './TableFieldComment';

const RobotPurchasesTableBodyCell: FC<RobotPurchasesTableBodyCellInterface> = (props) => {
	const { purchase, column } = props;

	const unknown = 'N/A';

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		purchase: SPCDataInterface,
		column: RobotPurchasesTableColumnInterface
	) => {
		const value = purchase[column.id];
		if (columns[0].id === column.id) {
			return value || unknown;
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
		} else if (columns[4].id === column.id) {
			return <Checkbox disabled checked={!!value} />;
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
