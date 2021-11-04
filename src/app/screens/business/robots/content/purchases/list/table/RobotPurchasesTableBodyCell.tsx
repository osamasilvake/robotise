import { Box, Chip, CircularProgress, Link, TableCell } from '@mui/material';
import i18next from 'i18next';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { SPCDataInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import {
	RobotItemTrackingLinkFetch,
	robotSelector
} from '../../../../../../../slices/business/robots/Robot.slice';
import { moment15MinsFromDate, momentFormat1 } from '../../../../../../../utilities/methods/Moment';
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
	const { index, purchase, column } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesTableStyle();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);

	const [trackingIndex, setTrackingIndex] = useState(-1);

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	const cRobotId = params.robotId;
	const translation = 'CONTENT.PURCHASES.LIST.TABLE.VALUES';

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
		const link = url.replace(':robotId', cRobotId).replace(':orderId', orderId);

		// push to history
		history.push(link);
	};

	/**
	 * handle item tracking link
	 * @param index
	 * @param purchase
	 * @returns
	 */
	const handleItemTrackingLink =
		(index: number, purchase: SPCDataInterface) => (event: MouseEvent<HTMLDivElement>) => {
			// stop propagation
			event.stopPropagation();

			// set tracking index
			setTrackingIndex(index);

			// dispatch: fetch item tracking link
			dispatch(
				RobotItemTrackingLinkFetch(
					cRobotId,
					{
						from: moment15MinsFromDate(purchase.createdAt),
						to: purchase.createdAt
					},
					(res) => {
						// open link on new tab
						res.data && window.open(res.data.dlink);

						// reset tracking index
						setTrackingIndex(-1);
					}
				)
			);
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
		if (column.id === RobotPurchasesTableColumnsTypeEnum.ITEM_TRACKING) {
			return (
				<Chip
					size="small"
					label={t(`${translation}.ITEM_TRACKING`)}
					color="primary"
					variant="outlined"
					clickable
					icon={
						robot.itemTracking.loading && trackingIndex === index ? (
							<CircularProgress size={20} />
						) : undefined
					}
					disabled={robot.itemTracking.loading}
					onClick={handleItemTrackingLink(index, purchase)}
				/>
			);
		} else {
			const value = purchase[column.id];
			if (RobotPurchasesTableColumnsTypeEnum.TARGET === column.id) {
				return (
					<Box>
						{value || AppConfigService.AppOptions.common.none}
						{!purchase.isBilled && (
							<Box component="span" className={classes.sTarget}>
								<Chip size="small" label={t(`${translation}.TARGET.UN_BILLED`)} />
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
				RobotPurchasesTableColumnsTypeEnum.ORDER_DETAILS === column.id &&
				purchase.order?.id
			) {
				return (
					<Link
						component="button"
						variant="body2"
						underline="hover"
						onClick={handleShowOrderDetail(purchase.order.id)}>
						{t(`${translation}.ORDER_DETAILS`)}
					</Link>
				);
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(purchase, column)}
		</TableCell>
	);
};
export default RobotPurchasesTableBodyCell;
