import { Box, Link, Stack, TableCell } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { SOCDataInterface } from '../../../../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { dateFormat1 } from '../../../../../../utilities/methods/Date';
import { GeneralAllOrdersTableColumnsTypeEnum } from './GeneralAllOrdersTable.enum';
import {
	GeneralAllOrdersTableBodyCellInterface,
	GeneralAllOrdersTableColumnInterface
} from './GeneralAllOrdersTable.interface';
import { mapOrder, mapStatus } from './GeneralAllOrdersTable.map';

const GeneralAllOrdersTableBodyCell: FC<GeneralAllOrdersTableBodyCellInterface> = (props) => {
	const { column, order } = props;
	const { t } = useTranslation('GENERAL');

	const cRobotId = order.robot.id;
	const translation = 'CONTENT.ALL_ORDERS.LIST';

	/**
	 * set cell value
	 * @param order
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		order: SOCDataInterface,
		column: GeneralAllOrdersTableColumnInterface
	) => {
		const mappedOrder = mapOrder(order);
		const value = mappedOrder[column.id];
		if (GeneralAllOrdersTableColumnsTypeEnum.CREATED === column.id) {
			return dateFormat1(String(value));
		} else if (
			GeneralAllOrdersTableColumnsTypeEnum.PURCHASE_DETAILS === column.id &&
			order.orderReport?.id
		) {
			return (
				<Link
					component={RouterLink}
					variant="body2"
					underline="hover"
					to={AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL.replace(
						':robotId',
						cRobotId
					).replace(':purchaseId', order.orderReport.id)}
					onClick={(e) => e.stopPropagation()}>
					{t(`${translation}.TABLE.VALUES.PURCHASE_DETAILS`)}
				</Link>
			);
		} else if (typeof value === 'string') {
			if (GeneralAllOrdersTableColumnsTypeEnum.STATUS === column.id) {
				return (
					<Stack spacing={0.5} direction="row" alignItems="center">
						<Box>
							<Status level={mapStatus(value)}>{t(value.replace(':', '_'))}</Status>
						</Box>
					</Stack>
				);
			} else if (GeneralAllOrdersTableColumnsTypeEnum.MODE === column.id) {
				return t(`COMMON.MODE.${value}`);
			}
			return t(value);
		}
		return value || AppConfigService.AppOptions.common.none;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			<>{setCellValue(order, column)}</>
		</TableCell>
	);
};
export default GeneralAllOrdersTableBodyCell;
