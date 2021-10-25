import { Box, Chip, Link, TableCell } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import { SOCDataInterface } from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import { RobotParamsInterface } from '../../../../Robot.interface';
import DialogCancelOrder from './DialogCancelOrder';
import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';
import {
	RobotOrdersTableBodyCellInterface,
	RobotOrdersTableColumnInterface
} from './RobotOrdersTable.interface';
import { isOrderCancellable, mapOrder, mapStatus } from './RobotOrdersTable.map';
import { RobotOrdersTableStyle } from './RobotOrdersTable.style';

const RobotOrdersTableBodyCell: FC<RobotOrdersTableBodyCellInterface> = (props) => {
	const { column, order } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersTableStyle();

	const [open, setOpen] = useState(false);

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	const cRobotId = params.robotId;
	const translation = 'CONTENT.ORDERS.LIST';

	/**
	 * open cancel order dialog
	 * @param event
	 */
	const openCancelOrderDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// show dialog
		setOpen(true);
	};

	/**
	 * handle show purchase detail
	 * @param purchaseId
	 * @returns
	 */
	const handleShowPurchaseDetail =
		(purchaseId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
			// stop propagation
			event.stopPropagation();

			// prepare link
			const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL;
			const robotLink = url.replace(':robotId', cRobotId).replace(':purchaseId', purchaseId);

			// push to history
			history.push(robotLink);
		};

	/**
	 * set cell value
	 * @param order
	 * @param column
	 * @returns
	 */
	const setCellValue = (order: SOCDataInterface, column: RobotOrdersTableColumnInterface) => {
		const mappedOrder = mapOrder(order);
		const value = mappedOrder[column.id];
		if (RobotOrdersTableColumnsTypeEnum.CREATED === column.id) {
			return momentFormat1(value);
		} else if (
			RobotOrdersTableColumnsTypeEnum.LINK_PURCHASE === column.id &&
			order.orderReport?.id
		) {
			return (
				<Link
					component="button"
					variant="body2"
					underline="hover"
					onClick={handleShowPurchaseDetail(order.orderReport.id)}>
					{t(`${translation}.TABLE.VALUES.LINK_PURCHASE`)}
				</Link>
			);
		} else if (typeof value === 'string') {
			if (RobotOrdersTableColumnsTypeEnum.STATUS === column.id) {
				return (
					<Box>
						<Status level={mapStatus(value)}>{t(value.replace(':', '_'))}</Status>
						{isOrderCancellable(value) && (
							<>
								<Chip
									size="small"
									label={t(`${translation}..ACTIONS.CANCEL.LABEL`)}
									variant="outlined"
									color="error"
									onDelete={openCancelOrderDialog}
									onClick={openCancelOrderDialog}
									className={classes.sCancelOrder}
								/>
								<DialogCancelOrder order={order} open={open} setOpen={setOpen} />
							</>
						)}
					</Box>
				);
			}
			return t(value);
		}
		return value || AppConfigService.AppOptions.common.none;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(order, column)}
		</TableCell>
	);
};
export default RobotOrdersTableBodyCell;
