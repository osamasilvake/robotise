import { CopyAll } from '@mui/icons-material';
import {
	Box,
	Chip,
	CircularProgress,
	Icon,
	Link,
	Stack,
	TableCell,
	Tooltip,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import ExternalLink from '../../../../../../components/common/external-link/ExternalLink';
import { ExternalLinkActionTypeEnum } from '../../../../../../components/common/external-link/ExternalLink.enum';
import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { AECDataInterface } from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import {
	elevatorCallsSelector,
	ElevatorCallsTemplateFetch
} from '../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { siteCloudConfigurationSelector } from '../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { deepLinkSelector } from '../../../../../../slices/settings/deep-links/DeepLink.slice';
import { dateFormat1, dateFormat3 } from '../../../../../../utilities/methods/Date';
import {
	GeneralAllElevatorCallsTableColumnStatusTypeEnum,
	GeneralAllElevatorCallsTableColumnsTypeEnum
} from './GeneralAllElevatorCallsTable.enum';
import {
	GeneralAllElevatorCallsTableBodyCellInterface,
	GeneralAllElevatorCallsTableColumnInterface
} from './GeneralAllElevatorCallsTable.interface';
import {
	mapElevatorCall,
	mapHistoryEventType,
	mapStatus
} from './GeneralAllElevatorCallsTable.map';
import { GeneralAllElevatorCallsTableStyle } from './GeneralAllElevatorCallsTable.style';

const GeneralAllElevatorCallsTableBodyCell: FC<GeneralAllElevatorCallsTableBodyCellInterface> = (
	props
) => {
	const { index, column, elevatorCall } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralAllElevatorCallsTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const elevatorCalls = useSelector(elevatorCallsSelector);
	const deepLink = useSelector(deepLinkSelector);
	const siteCloudConfiguration = useSelector(siteCloudConfigurationSelector);

	const [templateIndex, setTemplateIndex] = useState(-1);

	const cSiteId = elevatorCall?.site?.id;
	const cRobotId = elevatorCall?.robot?.id;
	const elevatorVendors = siteCloudConfiguration.elevatorVendors.content;
	const vendorName = elevatorVendors?.dataById?.[elevatorCall?.vendor];
	const translation = 'COMMON.ELEVATOR_CALLS.LIST.TABLE.VALUES';

	/**
	 * copy template
	 * @param index
	 */
	const copyTemplate = (index: number) => {
		// set index
		setTemplateIndex(index);

		// dispatch: fetch elevator calls template
		dispatch(
			ElevatorCallsTemplateFetch(elevatorCall.id, (res) => {
				// copy template
				navigator.clipboard.writeText(res.data.attributes.template);

				// reset index
				setTemplateIndex(-1);
			})
		);
	};

	/**
	 * set cell value
	 * @param elevatorCall
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		elevatorCall: AECDataInterface,
		column: GeneralAllElevatorCallsTableColumnInterface
	) => {
		const siteRobot = GeneralAllElevatorCallsTableColumnsTypeEnum.SITE_ROBOT === column.id;
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
		} else {
			if (column.id === GeneralAllElevatorCallsTableColumnsTypeEnum.ELEVATOR_LOGS) {
				return (
					<Stack direction="column" alignItems="center">
						<ExternalLink
							index={index}
							text={t(`${translation}.ELEVATOR_LOGS`)}
							payload={{
								vendor: elevatorCall.vendor,
								from: elevatorCall.createdAt,
								to: elevatorCall.updatedAt,
								callId: elevatorCall.id
							}}
							actionType={ExternalLinkActionTypeEnum.ELEVATOR_LOGS}
							showIcon={deepLink.elevatorLogs.loading}
							disabled={deepLink.elevatorLogs.loading}
						/>
						<Chip
							size="small"
							label={t(`${translation}.COPY_TEMPLATE`)}
							color="primary"
							variant="outlined"
							clickable
							disabled={index === templateIndex && elevatorCalls.updating}
							icon={
								index === templateIndex && elevatorCalls.updating ? (
									<CircularProgress size={18} />
								) : (
									<CopyAll />
								)
							}
							onClick={() => copyTemplate(index)}
							className={classes.sTableTemplateIcon}
						/>
					</Stack>
				);
			} else {
				const mappedElevatorCall = mapElevatorCall(elevatorCall);
				const value = mappedElevatorCall[column.id];
				if (GeneralAllElevatorCallsTableColumnsTypeEnum.CREATED === column.id) {
					return dateFormat1(String(value));
				} else if (GeneralAllElevatorCallsTableColumnsTypeEnum.HISTORY === column.id) {
					const history = elevatorCall.history;
					const historyMapped = mappedElevatorCall.history;
					return (
						<Box>
							{history.map((item, index) => (
								<Stack
									key={index}
									spacing={0.5}
									direction="row"
									className={classes.sTableHistory}>
									<Icon
										color={mapHistoryEventType(t(item.event)).color}
										className={classes.sTableHistoryIcon}>
										{mapHistoryEventType(t(item.event)).icon}
									</Icon>
									<Typography variant="body2" className={classes.sHistoryEvent}>
										{t(historyMapped[index].event)}
										{!!item.details && `: ${item.details}`}
									</Typography>
									<Typography variant="caption" color="textSecondary">
										({dateFormat3(item.createdAt)})
									</Typography>
								</Stack>
							))}
							{!history.length && AppConfigService.AppOptions.common.none}
						</Box>
					);
				} else if (typeof value === 'string') {
					if (GeneralAllElevatorCallsTableColumnsTypeEnum.API_STATUS === column.id) {
						return (
							<Tooltip
								title={
									value ===
									GeneralAllElevatorCallsTableColumnStatusTypeEnum.FAILED
										? t(`${translation}.API_STATUS.FAILED`)
										: ''
								}>
								<Box className={classes.sTableStatus}>
									<Status level={mapStatus(value)} capitalize>
										{t(value)}
									</Status>
								</Box>
							</Tooltip>
						);
					} else if (
						GeneralAllElevatorCallsTableColumnsTypeEnum.E2E_STATUS === column.id
					) {
						return (
							<Tooltip
								title={
									value ===
									GeneralAllElevatorCallsTableColumnStatusTypeEnum.FAILED
										? t(`${translation}.STATUS.FAILED`)
										: ''
								}>
								<Box className={classes.sTableStatus}>
									<Status level={mapStatus(value)} capitalize>
										{t(value)}
									</Status>
								</Box>
							</Tooltip>
						);
					} else if (GeneralAllElevatorCallsTableColumnsTypeEnum.VENDOR === column.id) {
						return vendorName?.title || '';
					}
					return t(value);
				}
				return value;
			}
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			<>{setCellValue(elevatorCall, column)}</>
		</TableCell>
	);
};
export default GeneralAllElevatorCallsTableBodyCell;
