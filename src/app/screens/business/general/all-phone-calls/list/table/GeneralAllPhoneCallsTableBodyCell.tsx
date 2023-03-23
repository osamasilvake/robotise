import { Description } from '@mui/icons-material';
import { Box, Icon, Link, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { APCDataInterface } from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice.interface';
import { GeneralCopyToClipboard } from '../../../../../../slices/business/general/GeneralOperations.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { dateFormat1, dateFormat3 } from '../../../../../../utilities/methods/Date';
import { GeneralAllPhoneCallsTableColumnsTypeEnum } from './GeneralAllPhoneCallsTable.enum';
import {
	GeneralAllPhoneCallsTableBodyCellInterface,
	GeneralAllPhoneCallsTableColumnInterface
} from './GeneralAllPhoneCallsTable.interface';
import { mapHistoryEventType, mapPhoneCall, mapStatus } from './GeneralAllPhoneCallsTable.map';
import { GeneralAllPhoneCallsTableStyle } from './GeneralAllPhoneCallsTable.style';

const GeneralAllPhoneCallsTableBodyCell: FC<GeneralAllPhoneCallsTableBodyCellInterface> = (
	props
) => {
	const { column, phoneCall } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralAllPhoneCallsTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const cSiteId = phoneCall?.site?.id;
	const cRobotId = sites.content?.dataById[cSiteId]?.robots[0]?.id || '';
	const translation = 'COMMON.PHONE_CALLS.LIST.TABLE.VALUES';

	/**
	 * set cell value
	 * @param phoneCall
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		phoneCall: APCDataInterface,
		column: GeneralAllPhoneCallsTableColumnInterface
	) => {
		const siteRobot = GeneralAllPhoneCallsTableColumnsTypeEnum.SITE_ROBOT === column.id;
		if (siteRobot) {
			const site = sites?.content?.dataById[cSiteId];
			const robot = robotTwinsSummary?.content?.dataById[cRobotId];
			if (!site || !robot) return AppConfigService.AppOptions.common.none;
			return (
				<>
					<Box>
						<Link
							component={RouterLink}
							variant="body1"
							underline="hover"
							to={AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.DETAIL.replace(
								':siteId',
								site.id
							)}
							onClick={(e) => e.stopPropagation()}>
							{site.title}
						</Link>
					</Box>
					<Box>
						<Link
							component={RouterLink}
							variant="body2"
							underline="hover"
							to={AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL.replace(
								':robotId',
								robot.robotId
							)}
							onClick={(e) => e.stopPropagation()}>
							{robot.robotTitle}
						</Link>
					</Box>
				</>
			);
		} else if (column.id === GeneralAllPhoneCallsTableColumnsTypeEnum.ID) {
			return (
				<Box onClick={(e) => dispatch(GeneralCopyToClipboard(phoneCall.id, e))}>
					<Tooltip title={phoneCall.id}>
						<Description color="action" fontSize="small" />
					</Tooltip>
				</Box>
			);
		} else {
			const mappedPhoneCall = mapPhoneCall(phoneCall);
			const value = mappedPhoneCall[column.id];
			if (GeneralAllPhoneCallsTableColumnsTypeEnum.UPDATED === column.id) {
				return dateFormat1(String(value));
			} else if (GeneralAllPhoneCallsTableColumnsTypeEnum.HISTORY === column.id) {
				const history = phoneCall.history;

				return (
					<Box>
						{history.map((item, index) => (
							<Stack key={index} spacing={0.5} direction="row">
								<Icon
									color={mapHistoryEventType(t(item.event)).color}
									className={classes.sTableHistoryIcon}>
									{mapHistoryEventType(t(item.event)).icon}
								</Icon>
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
			} else if (GeneralAllPhoneCallsTableColumnsTypeEnum.ROOM === column.id) {
				return (
					mappedPhoneCall?.locationName ||
					value ||
					AppConfigService.AppOptions.common.none
				);
			} else if (typeof value === 'string') {
				if (GeneralAllPhoneCallsTableColumnsTypeEnum.STATUS === column.id) {
					return (
						<Status level={mapStatus(value)} capitalize>
							{t(value)}
						</Status>
					);
				} else if (GeneralAllPhoneCallsTableColumnsTypeEnum.FROM === column.id) {
					return value ? (
						<Link underline="hover" href={`tel:${value}`}>
							{value}
						</Link>
					) : (
						AppConfigService.AppOptions.common.none
					);
				} else if (GeneralAllPhoneCallsTableColumnsTypeEnum.TO === column.id) {
					return (
						<Link underline="hover" href={`tel:${value}`}>
							{value}
						</Link>
					);
				}
				return t(value);
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align} style={{ padding: column?.padding }}>
			<>{setCellValue(phoneCall, column)}</>
		</TableCell>
	);
};
export default GeneralAllPhoneCallsTableBodyCell;
