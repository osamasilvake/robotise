import { Box, Icon, Link, Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { SLCDataInterface } from '../../../../../../slices/business/sites/sms-list/SMSList.slice.interface';
import { dateFormat1, dateFormat3 } from '../../../../../../utilities/methods/Date';
import { SiteSMSListTableColumnsTypeEnum } from './SiteSMSListTable.enum';
import {
	SiteSMSListTableBodyCellInterface,
	SiteSMSListTableColumnInterface
} from './SiteSMSListTable.interface';
import { mapHistoryEventType, mapSMSItem, mapStatus } from './SiteSMSListTable.map';
import { SiteSMSListTableStyle } from './SiteSMSListTable.style';

const SiteSMSListTableBodyCell: FC<SiteSMSListTableBodyCellInterface> = (props) => {
	const { column, smsItem } = props;
	const { t } = useTranslation(['SITES', 'GENERAL']);
	const classes = SiteSMSListTableStyle();

	const translation = 'CONTENT.SMS_LIST.LIST.TABLE.VALUES';

	/**
	 * set cell value
	 * @param smsItem
	 * @param column
	 * @returns
	 */
	const setCellValue = (smsItem: SLCDataInterface, column: SiteSMSListTableColumnInterface) => {
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
								color={mapHistoryEventType(t(item.event)).color}
								className={classes.sTableHistoryIcon}>
								{mapHistoryEventType(t(item.event)).icon}
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
			if (SiteSMSListTableColumnsTypeEnum.STATUS === column.id) {
				return (
					<Status level={mapStatus(value)} capitalize>
						{t(value)}
					</Status>
				);
			} else if (SiteSMSListTableColumnsTypeEnum.FROM === column.id) {
				return (
					<Link underline="hover" href={`tel:${value}`}>
						{value}
					</Link>
				);
			} else if (SiteSMSListTableColumnsTypeEnum.TO === column.id) {
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
export default SiteSMSListTableBodyCell;
