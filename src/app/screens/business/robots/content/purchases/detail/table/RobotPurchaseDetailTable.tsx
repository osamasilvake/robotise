import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../services';
import { SPCDataCartInterface } from '../../../../../../../slices/purchases/Purchases.slice.interface';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import {
	RobotPurchaseDetailInterface,
	RobotPurchaseDetailTableColumnInterface
} from '../RobotPurchaseDetail.interface';
import { RobotPurchaseDetailStyles } from '../RobotPurchaseDetail.style';
import { RobotPurchaseDetailTableColumnsTypeEnum } from './RobotPurchaseDetailTable.enum';
import { columns } from './RobotPurchaseDetailTable.list';

const RobotPurchaseDetailTable: FC<RobotPurchaseDetailInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseDetailStyles();

	/**
	 * set cell value
	 * @param lane
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		row: SPCDataCartInterface,
		column: RobotPurchaseDetailTableColumnInterface
	) => {
		switch (column.id) {
			case RobotPurchaseDetailTableColumnsTypeEnum.TITLE:
				return row[column.id];
			case RobotPurchaseDetailTableColumnsTypeEnum.QUANTITY:
				return row[column.id];
			case RobotPurchaseDetailTableColumnsTypeEnum.PRICE:
			default:
				return `${currencyFormat(
					Number(row[column.id]),
					(purchase?.content && purchase.content['currency']) ||
						AppConfigService.AppOptions.common.defaultCurrency,
					i18next.language
				)}`;
		}
	};

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((column: RobotPurchaseDetailTableColumnInterface) => (
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
							{columns.map((column: RobotPurchaseDetailTableColumnInterface) => (
								<TableCell key={column.id} align={column.align}>
									{setCellValue(row, column)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>

				<TableBody className={classes.sTableBody}>
					<TableRow>
						<TableCell>
							<Typography variant="h6">Total</Typography>
						</TableCell>
						<TableCell></TableCell>
						<TableCell align="right">
							<Typography variant="h6">
								{`${currencyFormat(
									Number(purchase?.content?.totalPrice),
									(purchase?.content && purchase.content['currency']) ||
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
export default RobotPurchaseDetailTable;
