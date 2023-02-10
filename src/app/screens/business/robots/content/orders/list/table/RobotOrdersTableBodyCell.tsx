import { Box, Chip, Link, Stack, TableCell } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import { SOCDataInterface } from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
import { roomsSelector } from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { dateDayJs, dateFormat1 } from '../../../../../../../utilities/methods/Date';
import { RobotParamsInterface } from '../../../../Robot.interface';
import DialogCancelOrder from './DialogCancelOrder';
import DialogRestartOrder from './DialogRestartOrder';
import {
	RobotOrdersTableColumnStatusTypeEnum,
	RobotOrdersTableColumnsTypeEnum
} from './RobotOrdersTable.enum';
import {
	RobotOrdersTableBodyCellInterface,
	RobotOrdersTableColumnInterface
} from './RobotOrdersTable.interface';
import { isOrderCancellable, mapOrder, mapStatus } from './RobotOrdersTable.map';
import { RobotOrdersTableStyle } from './RobotOrdersTable.style';

const RobotOrdersTableBodyCell: FC<RobotOrdersTableBodyCellInterface> = (props) => {
	const { column, order } = props;
	const { t } = useTranslation('GENERAL');
	const classes = RobotOrdersTableStyle();

	const rooms = useSelector(roomsSelector);

	const [openCancel, setOpenCancel] = useState(false);
	const [openRestart, setOpenRestart] = useState(false);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const roomsDataBy = rooms.content?.dataById;
	const locationName = roomsDataBy?.[order.location]?.name;
	const translation = 'COMMON.ORDERS.LIST';

	/**
	 * open cancel order dialog
	 * @param event
	 */
	const openCancelOrderDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// show dialog
		setOpenCancel(true);
	};

	/**
	 * open restart order dialog
	 * @param event
	 */
	const openRestartOrderDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// show dialog
		setOpenRestart(true);
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
			return dateFormat1(String(value));
		} else if (
			RobotOrdersTableColumnsTypeEnum.PURCHASE_DETAILS === column.id &&
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
			if (RobotOrdersTableColumnsTypeEnum.STATUS === column.id) {
				const notFinished = order.status !== RobotOrdersTableColumnStatusTypeEnum.FINISHED;
				const yesterday = dateDayJs().subtract(1, 'd');
				const notBefore24hrs = dateDayJs(order.createdAt).isAfter(yesterday);
				return (
					<Stack spacing={0.5} direction="row" alignItems="center">
						<Box>
							<Status level={mapStatus(value)}>{t(value.replace(':', '_'))}</Status>
						</Box>
						{isOrderCancellable(value) && (
							<Box>
								<Chip
									size="small"
									label={t(`${translation}.ACTIONS.CANCEL.LABEL`)}
									variant="outlined"
									color="error"
									onDelete={openCancelOrderDialog}
									onClick={openCancelOrderDialog}
									className={classes.sCancelOrder}
								/>
								{openCancel && (
									<DialogCancelOrder
										order={order}
										open={openCancel}
										setOpen={setOpenCancel}
									/>
								)}
							</Box>
						)}
						{notFinished && notBefore24hrs && (
							<Box>
								<Chip
									size="small"
									label={t(`${translation}.ACTIONS.RESTART.LABEL`)}
									variant="outlined"
									color="primary"
									onDelete={openRestartOrderDialog}
									onClick={openRestartOrderDialog}
									className={classes.sRestartOrder}
								/>
								{openRestart && (
									<DialogRestartOrder
										order={order}
										open={openRestart}
										setOpen={setOpenRestart}
									/>
								)}
							</Box>
						)}
					</Stack>
				);
			} else if (RobotOrdersTableColumnsTypeEnum.MODE === column.id) {
				return t(`COMMON.MODE.${value}`);
			} else if (RobotOrdersTableColumnsTypeEnum.TARGET === column.id) {
				return locationName || value;
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
export default RobotOrdersTableBodyCell;
