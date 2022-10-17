import { Box, Icon, Link, Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import { PCCDataInterface } from '../../../../../../../slices/business/sites/phone-calls/PhoneCalls.slice.interface';
import { dateFormat1, dateFormat3 } from '../../../../../../../utilities/methods/Date';
import { SitePhoneCallsTableColumnsTypeEnum } from './SitePhoneCallsTable.enum';
import {
	SitePhoneCallsTableBodyCellInterface,
	SitePhoneCallsTableColumnInterface
} from './SitePhoneCallsTable.interface';
import { mapHistoryEventType, mapPhoneCall, mapStatus } from './SitePhoneCallsTable.map';
import { SitePhoneCallsTableStyle } from './SitePhoneCallsTable.style';

const SitePhoneCallsTableBodyCell: FC<SitePhoneCallsTableBodyCellInterface> = (props) => {
	const { column, phoneCall } = props;
	const { t } = useTranslation(['SITES', 'GENERAL']);
	const classes = SitePhoneCallsTableStyle();

	const translation = 'CONTENT.PHONE_CALLS.LIST.TABLE.VALUES';

	/**
	 * set cell value
	 * @param phoneCall
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		phoneCall: PCCDataInterface,
		column: SitePhoneCallsTableColumnInterface
	) => {
		const mappedPhoneCall = mapPhoneCall(phoneCall);
		const value = mappedPhoneCall[column.id];
		if (SitePhoneCallsTableColumnsTypeEnum.UPDATED === column.id) {
			return dateFormat1(String(value));
		} else if (SitePhoneCallsTableColumnsTypeEnum.HISTORY === column.id) {
			const history = phoneCall.history;
			const historyMapped = mappedPhoneCall.history;

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
			if (SitePhoneCallsTableColumnsTypeEnum.STATUS === column.id) {
				return (
					<Status level={mapStatus(value)} capitalize>
						{t(value)}
					</Status>
				);
			} else if (SitePhoneCallsTableColumnsTypeEnum.FROM === column.id) {
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
			<>{setCellValue(phoneCall, column)}</>
		</TableCell>
	);
};
export default SitePhoneCallsTableBodyCell;
