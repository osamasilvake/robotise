import { Description } from '@mui/icons-material';
import { Box, Chip, Link, TableCell, Tooltip } from '@mui/material';
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

import ExternalLink from '../../../../../../../components/common/external-link/ExternalLink';
import { ExternalLinkActionTypeEnum } from '../../../../../../../components/common/external-link/ExternalLink.enum';
import { AppConfigService } from '../../../../../../../services';
import { AppDispatch } from '../../../../../../../slices';
import { GeneralCopyToClipboard } from '../../../../../../../slices/business/general/GeneralOperations.slice';
import { SPCDataInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { roomsSelector } from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { deepLinkSelector } from '../../../../../../../slices/settings/deep-links/DeepLink.slice';
import { dateFormat1, dateMinsPriorToDate } from '../../../../../../../utilities/methods/Date';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { RobotParamsInterface } from '../../../../Robot.interface';
import {
	RobotPurchasesTableBodyCellInterface,
	RobotPurchasesTableColumnInterface
} from '../../../purchases/list/table/RobotPurchasesTable.interface';
import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';
import { RobotPurchasesTableStyle } from './RobotPurchasesTable.style';
import RobotPurchasesTableBodyCellComment from './RobotPurchasesTableBodyCellComment';

const RobotPurchasesTableBodyCell: FC<RobotPurchasesTableBodyCellInterface> = (props) => {
	const { index, purchase, column } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const rooms = useSelector(roomsSelector);
	const deepLink = useSelector(deepLinkSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const roomsDataBy = rooms.content?.dataById;
	const locationName = roomsDataBy?.[purchase.location]?.name;
	const translation = 'CONTENT.PURCHASES.LIST.TABLE.VALUES';

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
				<ExternalLink
					index={index}
					text={t(`${translation}.ITEM_TRACKING`)}
					payload={{
						robotId: cRobotId,
						from: dateMinsPriorToDate(purchase.createdAt, 15),
						to: purchase.createdAt
					}}
					actionType={ExternalLinkActionTypeEnum.ITEM_TRACKING}
					showIcon={deepLink.itemTracking.loading}
					disabled={deepLink.itemTracking.loading}
				/>
			);
		} else if (column.id === RobotPurchasesTableColumnsTypeEnum.ID) {
			return (
				<Box onClick={(e) => dispatch(GeneralCopyToClipboard(purchase.id, e))}>
					<Tooltip title={purchase.id}>
						<Description color="action" fontSize="small" />
					</Tooltip>
				</Box>
			);
		} else {
			const value = purchase[column.id];
			if (RobotPurchasesTableColumnsTypeEnum.TARGET === column.id) {
				return (
					<>
						{locationName || value || AppConfigService.AppOptions.common.none}
						{!purchase.isBilled && (
							<Box component="span" className={classes.sTarget}>
								<Chip size="small" label={t(`${translation}.TARGET.UN_BILLED`)} />
							</Box>
						)}
					</>
				);
			} else if (RobotPurchasesTableColumnsTypeEnum.CREATED === column.id) {
				return dateFormat1(String(value));
			} else if (RobotPurchasesTableColumnsTypeEnum.TOTAL_PRICE === column.id) {
				const price = +value;
				return price > 0
					? `${currencyFormat(price, i18next.language, purchase.currency)}`
					: 0;
			} else if (RobotPurchasesTableColumnsTypeEnum.COMMENT === column.id) {
				return <RobotPurchasesTableBodyCellComment purchase={purchase} />;
			} else if (
				RobotPurchasesTableColumnsTypeEnum.ORDER_DETAILS === column.id &&
				purchase.order?.id
			) {
				return (
					<Link
						component={RouterLink}
						variant="body2"
						underline="hover"
						to={AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.DETAIL.replace(
							':robotId',
							cRobotId
						).replace(':orderId', purchase.order.id)}
						onClick={(e) => e.stopPropagation()}>
						{t(`${translation}.ORDER_DETAILS`)}
					</Link>
				);
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align} style={{ padding: column?.padding }}>
			<>{setCellValue(purchase, column)}</>
		</TableCell>
	);
};
export default RobotPurchasesTableBodyCell;
