import { Description } from '@mui/icons-material';
import { Box, Icon, Link, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { GeneralCopyToClipboard } from '../../../../../../slices/business/general/GeneralOperations.slice';
import { roomsSelector } from '../../../../../../slices/business/sites/rooms/Rooms.slice';
import { SLCDataInterface } from '../../../../../../slices/business/sites/sms-list/SMSList.slice.interface';
import { dateFormat1, dateFormat3 } from '../../../../../../utilities/methods/Date';
import {
	SiteSMSListTableColumnHistoryEventTypeEnum,
	SiteSMSListTableColumnsTypeEnum
} from './SiteSMSListTable.enum';
import {
	SiteSMSListTableBodyCellInterface,
	SiteSMSListTableColumnInterface
} from './SiteSMSListTable.interface';
import { mapHistoryEventType, mapSMSItem, mapStatus } from './SiteSMSListTable.map';
import { SiteSMSListTableStyle } from './SiteSMSListTable.style';

const SiteSMSListTableBodyCell: FC<SiteSMSListTableBodyCellInterface> = (props) => {
	const { column, smsItem } = props;
	const { t } = useTranslation('GENERAL');
	const classes = SiteSMSListTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const rooms = useSelector(roomsSelector);

	const roomsDataBy = rooms.content?.dataById;
	const locationName = roomsDataBy?.[smsItem.room]?.name;
	const translation = 'COMMON.SMS_LIST.LIST.TABLE.VALUES';

	/**
	 * set cell value
	 * @param smsItem
	 * @param column
	 * @returns
	 */
	const setCellValue = (smsItem: SLCDataInterface, column: SiteSMSListTableColumnInterface) => {
		if (column.id === SiteSMSListTableColumnsTypeEnum.ID) {
			return (
				<Box onClick={(e) => dispatch(GeneralCopyToClipboard(smsItem.id, e))}>
					<Tooltip title={smsItem.id}>
						<Description color="action" fontSize="small" />
					</Tooltip>
				</Box>
			);
		} else {
			const mappedSMSItem = mapSMSItem(smsItem);
			const value = mappedSMSItem[column.id];
			if (SiteSMSListTableColumnsTypeEnum.UPDATED === column.id) {
				return dateFormat1(String(value));
			} else if (SiteSMSListTableColumnsTypeEnum.HISTORY === column.id) {
				const history = smsItem.history;
				const historyMapped = mappedSMSItem.history;

				return (
					<Box>
						{history.map((item, index) => (
							<Stack key={index} spacing={0.5} direction="row">
								<Icon
									color={
										mapHistoryEventType(
											t(
												item.event ===
													SiteSMSListTableColumnHistoryEventTypeEnum.ORDER_ASSIGNED
													? item.event
													: item.details
											)
										).color
									}
									className={classes.sTableHistoryIcon}>
									{
										mapHistoryEventType(
											t(
												item.event ===
													SiteSMSListTableColumnHistoryEventTypeEnum.ORDER_ASSIGNED
													? item.event
													: item.details
											)
										).icon
									}
								</Icon>
								<Typography variant="body2" className={classes.sHistoryEvent}>
									{t(historyMapped[index].event)}
								</Typography>
								{item.details && (
									<>
										{item.event === 'orderAssigned' && (
											<Link
												component={RouterLink}
												variant="body2"
												underline="hover"
												to={AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.ALL_ORDERS.DETAIL.replace(
													':orderId',
													item.details
												)}
												target="_blank"
												onClick={(e) => e.stopPropagation()}>
												{t(`${translation}.HISTORY.ORDER_DETAIL`)}
											</Link>
										)}
									</>
								)}
								<Typography variant="caption" color="textSecondary">
									({dateFormat3(item.createdAt)})
								</Typography>
							</Stack>
						))}
						{!history.length && AppConfigService.AppOptions.common.none}
					</Box>
				);
			} else if (typeof value === 'string') {
				if (SiteSMSListTableColumnsTypeEnum.STATUS === column.id) {
					return (
						<Status level={mapStatus(value)} capitalize>
							{t(value)}
						</Status>
					);
				} else if (SiteSMSListTableColumnsTypeEnum.FROM === column.id) {
					return value ? (
						<Link underline="hover" href={`tel:${value}`}>
							{value}
						</Link>
					) : (
						AppConfigService.AppOptions.common.none
					);
				} else if (SiteSMSListTableColumnsTypeEnum.TO === column.id) {
					return (
						<Link underline="hover" href={`tel:${value}`}>
							{value}
						</Link>
					);
				}
				return t(value);
			} else if (SiteSMSListTableColumnsTypeEnum.ROOM === column.id) {
				return locationName || value;
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align} style={{ padding: column?.padding }}>
			<>{setCellValue(smsItem, column)}</>
		</TableCell>
	);
};
export default SiteSMSListTableBodyCell;
