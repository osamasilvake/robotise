import { Box, Chip, Link, TableCell } from '@mui/material';
import i18next from 'i18next';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { SPCDataInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { RobotParamsInterface } from '../../../../Robot.interface';
import {
	RobotPurchasesTableBodyCellInterface,
	RobotPurchasesTableColumnInterface
} from '../../../purchases/list/table/RobotPurchasesTable.interface';
import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';
import { RobotPurchasesTableStyle } from './RobotPurchasesTable.style';
import TableFieldComment from './TableFieldComment';

const RobotPurchasesTableBodyCell: FC<RobotPurchasesTableBodyCellInterface> = (props) => {
	const { purchase, column } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesTableStyle();

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	const cRobotId = params.robotId;

	/**
	 * handle show order detail
	 * @param orderId
	 * @returns
	 */
	const handleShowOrderDetail = (orderId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
		// stop propagation
		event.stopPropagation();

		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.DETAIL;
		const robotLink = url.replace(':robotId', cRobotId).replace(':orderId', orderId);

		// push to history
		history.push(robotLink);
	};

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
		if (RobotPurchasesTableColumnsTypeEnum.TARGET === column.id) {
			return (
				<Box>
					{value || AppConfigService.AppOptions.common.none}
					{!purchase.isBilled && (
						<Box component="span" className={classes.sTarget}>
							<Chip
								size="small"
								label={t(`CONTENT.PURCHASES.LIST.TABLE.VALUES.TARGET.UN_BILLED`)}
							/>
						</Box>
					)}
				</Box>
			);
		} else if (RobotPurchasesTableColumnsTypeEnum.CREATED === column.id) {
			return momentFormat1(value);
		} else if (RobotPurchasesTableColumnsTypeEnum.TOTAL_PRICE === column.id) {
			const price = Number(value);
			return price > 0
				? `${currencyFormat(
						price,
						purchase.currency || AppConfigService.AppOptions.common.defaultCurrency,
						i18next.language
				  )}`
				: 0;
		} else if (RobotPurchasesTableColumnsTypeEnum.COMMENT === column.id) {
			return <TableFieldComment purchase={purchase} />;
		} else if (
			RobotPurchasesTableColumnsTypeEnum.ORDER_STATUS === column.id &&
			purchase.order?.id
		) {
			return (
				<Link
					component="button"
					variant="body1"
					underline="hover"
					onClick={handleShowOrderDetail(purchase.order.id)}>
					{t('CONTENT.PURCHASES.LIST.TABLE.VALUES.ORDER_STATUS')}
				</Link>
			);
		}
		return value || AppConfigService.AppOptions.common.none;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(purchase, column)}
		</TableCell>
	);
};
export default RobotPurchasesTableBodyCell;
