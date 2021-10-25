import { Box, Chip, CircularProgress, Link, TableCell } from '@mui/material';
import i18next from 'i18next';
import { FC, MouseEvent } from 'react';
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
	const { index, idx, setIdx, purchase, column } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesTableStyle();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);

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
	 * request item tracking link
	 * @param index
	 * @param purchase
	 * @returns
	 */
	const requestItemTrackingLink =
		(index: number, purchase: SPCDataInterface) => (event: MouseEvent<HTMLDivElement>) => {
			// stop propagation
			event.stopPropagation();

			// set index
			setIdx(index);

			// dispatch: fetch item tracking link from kibana
			dispatch(
				RobotItemTrackingLinkFetch(cRobotId, {
					purchaseId: purchase.id,
					from: moment15MinsFromDate(purchase.createdAt),
					to: purchase.createdAt
				})
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
			const condition1 = idx === -1 || idx === index;
			const condition2 = robot.itemTracking.content?.purchaseId === purchase.id;
			const condition3 = robot.itemTracking.content?.data?.dlink;

			return (
				<>
					{!(condition1 && condition2 && condition3) && (
						<Chip
							size="small"
							label={t('CONTENT.PURCHASES.LIST.TABLE.VALUES.ITEM_TRACKING.REQUEST')}
							color="primary"
							variant="outlined"
							clickable
							icon={
								robot.itemTracking.loading && idx === index ? (
									<CircularProgress size={20} />
								) : undefined
							}
							disabled={robot.itemTracking.loading}
							onClick={requestItemTrackingLink(index, purchase)}
						/>
					)}

					{!robot.itemTracking.loading && condition1 && condition2 && condition3 && (
						<Link
							underline="hover"
							variant="body2"
							href={String(condition3)}
							target="_blank"
							onClick={(e) => e.stopPropagation()}>
							{t('CONTENT.PURCHASES.LIST.TABLE.VALUES.ITEM_TRACKING.VISIT')}
						</Link>
					)}
				</>
			);
		} else {
			const value = purchase[column.id];
			if (RobotPurchasesTableColumnsTypeEnum.TARGET === column.id) {
				return (
					<Box>
						{value || AppConfigService.AppOptions.common.none}
						{!purchase.isBilled && (
							<Box component="span" className={classes.sTarget}>
								<Chip
									size="small"
									label={t(
										`CONTENT.PURCHASES.LIST.TABLE.VALUES.TARGET.UN_BILLED`
									)}
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
				RobotPurchasesTableColumnsTypeEnum.LINK_ORDER === column.id &&
				purchase.order?.id
			) {
				return (
					<Link
						component="button"
						variant="body2"
						underline="hover"
						onClick={handleShowOrderDetail(purchase.order.id)}>
						{t('CONTENT.PURCHASES.LIST.TABLE.VALUES.LINK_ORDER')}
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
