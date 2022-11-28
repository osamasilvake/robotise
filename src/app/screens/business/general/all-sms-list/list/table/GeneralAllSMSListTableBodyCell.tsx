import { Box, Icon, Link, Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { ASLDataInterface } from '../../../../../../slices/business/general/all-sms-list/AllSMSList.slice.interface';
import { dateFormat1, dateFormat3 } from '../../../../../../utilities/methods/Date';
import {
	GeneralAllSMSListTableColumnHistoryEventTypeEnum,
	GeneralAllSMSListTableColumnsTypeEnum
} from './GeneralAllSMSListTable.enum';
import {
	GeneralAllSMSListTableBodyCellInterface,
	GeneralAllSMSListTableColumnInterface
} from './GeneralAllSMSListTable.interface';
import { mapHistoryEventType, mapSMSItem, mapStatus } from './GeneralAllSMSListTable.map';
import { GeneralAllSMSListTableStyle } from './GeneralAllSMSListTable.style';

const GeneralAllSMSListTableBodyCell: FC<GeneralAllSMSListTableBodyCellInterface> = (props) => {
	const { column, smsItem } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralAllSMSListTableStyle();

	const translation = 'COMMON.SMS_LIST.LIST.TABLE.VALUES';

	/**
	 * set cell value
	 * @param smsItem
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		smsItem: ASLDataInterface,
		column: GeneralAllSMSListTableColumnInterface
	) => {
		const mappedSMSItem = mapSMSItem(smsItem);
		const value = mappedSMSItem[column.id];
		if (GeneralAllSMSListTableColumnsTypeEnum.UPDATED === column.id) {
			return dateFormat1(String(value));
		} else if (GeneralAllSMSListTableColumnsTypeEnum.HISTORY === column.id) {
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
												GeneralAllSMSListTableColumnHistoryEventTypeEnum.ORDER_ASSIGNED
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
												GeneralAllSMSListTableColumnHistoryEventTypeEnum.ORDER_ASSIGNED
												? item.event
												: item.details
										)
									).icon
								}
							</Icon>
							<Typography variant="body2" className={classes.sHistoryEvent}>
								{t(historyMapped[index].event)}:
							</Typography>
							{item.details && (
								<>
									{item.event !== 'orderAssigned' && (
										<Typography
											variant="body2"
											className={classes.sHistoryDetails}>
											{item.details}
										</Typography>
									)}
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
			if (GeneralAllSMSListTableColumnsTypeEnum.STATUS === column.id) {
				return (
					<Status level={mapStatus(value)} capitalize>
						{t(value)}
					</Status>
				);
			} else if (GeneralAllSMSListTableColumnsTypeEnum.FROM === column.id) {
				return value ? (
					<Link underline="hover" href={`tel:${value}`}>
						{value}
					</Link>
				) : (
					AppConfigService.AppOptions.common.none
				);
			} else if (GeneralAllSMSListTableColumnsTypeEnum.TO === column.id) {
				return (
					<Link underline="hover" href={`tel:${value}`}>
						{value}
					</Link>
				);
			}
			return t(value);
		}
		return value || AppConfigService.AppOptions.common.none;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			<>{setCellValue(smsItem, column)}</>
		</TableCell>
	);
};
export default GeneralAllSMSListTableBodyCell;
