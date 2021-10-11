import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../services';
import { SPCDataCartInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { RobotPurchaseTableColumnsTypeEnum } from './RobotPurchaseTable.enum';
import {
	RobotPurchaseTableColumnInterface,
	RobotPurchaseTableInterface
} from './RobotPurchaseTable.interface';
import { columns } from './RobotPurchaseTable.list';
import { RobotPurchaseTableStyle } from './RobotPurchaseTable.style';

const RobotPurchaseTable: FC<RobotPurchaseTableInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseTableStyle();

	/**
	 * set cell value
	 * @param row
	 * @param column
	 * @returns
	 */
	const setCellValue = (row: SPCDataCartInterface, column: RobotPurchaseTableColumnInterface) => {
		const defaultCurrency = AppConfigService.AppOptions.common.defaultCurrency;
		const currency = (purchase?.content && purchase.content.currency) || defaultCurrency;
		const quantity = Number(row[RobotPurchaseTableColumnsTypeEnum.QUANTITY]);
		const price = Number(row[RobotPurchaseTableColumnsTypeEnum.PRICE_UNIT]);

		switch (column.id) {
			case RobotPurchaseTableColumnsTypeEnum.TITLE:
				return row[column.id];
			case RobotPurchaseTableColumnsTypeEnum.QUANTITY:
				return quantity;
			case RobotPurchaseTableColumnsTypeEnum.PRICE_UNIT:
				return `${currencyFormat(price, currency, i18next.language)}`;
			case RobotPurchaseTableColumnsTypeEnum.PRICE_TOTAL:
			default:
				return `${currencyFormat(quantity * price, currency, i18next.language)}`;
		}
	};

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((column: RobotPurchaseTableColumnInterface) => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{
									minWidth: column.minWidth,
									width: column.width
								}}>
								{t(column.label)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{purchase?.content?.cart.map((row) => (
						<TableRow key={row.id}>
							{columns.map((column: RobotPurchaseTableColumnInterface) => (
								<TableCell key={column.id} align={column.align}>
									{setCellValue(row, column)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>

				{/* Row: Total */}
				<TableBody className={classes.sTableBody}>
					<TableRow>
						<TableCell>
							<Typography variant="h6">
								{t('CONTENT.PURCHASES.DETAIL.TABLE.VALUES.TOTAL')}
							</Typography>
						</TableCell>
						<TableCell />
						<TableCell />
						<TableCell align="right">
							<Typography variant="h6">
								{`${currencyFormat(
									Number(purchase?.content?.totalPrice),
									(purchase?.content && purchase.content.currency) ||
										AppConfigService.AppOptions.common.defaultCurrency,
									i18next.language
								)}`}
							</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default RobotPurchaseTable;
