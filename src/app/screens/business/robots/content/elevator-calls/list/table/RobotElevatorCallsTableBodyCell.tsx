import { CopyAll, Description, OpenInNew } from '@mui/icons-material';
import {
	Box,
	Chip,
	CircularProgress,
	Icon,
	Stack,
	TableCell,
	Tooltip,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExternalLink from '../../../../../../../components/common/external-link/ExternalLink';
import { ExternalLinkActionTypeEnum } from '../../../../../../../components/common/external-link/ExternalLink.enum';
import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import { AppDispatch } from '../../../../../../../slices';
import { GeneralCopyToClipboard } from '../../../../../../../slices/business/general/GeneralOperations.slice';
import {
	elevatorCallsSelector,
	ElevatorCallsTemplateFetch
} from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice';
import { ECCDataInterface } from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { siteCloudConfigurationSelector } from '../../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice';
import { deepLinkSelector } from '../../../../../../../slices/settings/deep-links/DeepLink.slice';
import { dateFormat1, dateFormat3 } from '../../../../../../../utilities/methods/Date';
import DialogElevatorCallsManualTest from './DialogElevatorCallsManualTest';
import {
	RobotElevatorCallsTableColumnStatusTypeEnum,
	RobotElevatorCallsTableColumnsTypeEnum,
	RobotElevatorCallsVendorTypeEnum
} from './RobotElevatorCallsTable.enum';
import {
	RobotElevatorCallsTableBodyCellInterface,
	RobotElevatorCallsTableColumnInterface
} from './RobotElevatorCallsTable.interface';
import { mapElevatorCall, mapHistoryEventType, mapStatus } from './RobotElevatorCallsTable.map';
import { RobotElevatorCallsTableStyle } from './RobotElevatorCallsTable.style';

const RobotElevatorCallsTableBodyCell: FC<RobotElevatorCallsTableBodyCellInterface> = (props) => {
	const { index, column, elevatorCall } = props;
	const { t } = useTranslation('GENERAL');
	const classes = RobotElevatorCallsTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const elevatorCalls = useSelector(elevatorCallsSelector);
	const deepLink = useSelector(deepLinkSelector);
	const siteCloudConfiguration = useSelector(siteCloudConfigurationSelector);

	const [templateIndex, setTemplateIndex] = useState(-1);
	const [manualEvents, setManualEvents] = useState(-1);

	const elevatorVendors = siteCloudConfiguration.elevatorVendors.content;
	const vendorName = elevatorVendors?.dataById?.[elevatorCall?.vendor];
	const isManualTest =
		elevatorCall?.vendor === RobotElevatorCallsVendorTypeEnum.MANUAL_TEST &&
		elevatorCall.status !== RobotElevatorCallsTableColumnStatusTypeEnum.FAILED &&
		elevatorCall.status !== RobotElevatorCallsTableColumnStatusTypeEnum.SUCCESS;
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
		elevatorCall: ECCDataInterface,
		column: RobotElevatorCallsTableColumnInterface
	) => {
		if (column.id === RobotElevatorCallsTableColumnsTypeEnum.ELEVATOR_LOGS) {
			return (
				<Stack direction="column" alignItems="center">
					{/* Manual Test */}
					{isManualTest && (
						<>
							<Chip
								size="small"
								label={t(`${translation}.MANUAL_EVENTS.TITLE`)}
								color="success"
								variant="outlined"
								clickable
								disabled={index === templateIndex && elevatorCalls.updating}
								icon={
									index === templateIndex && elevatorCalls.updating ? (
										<CircularProgress size={18} />
									) : (
										<OpenInNew />
									)
								}
								onClick={() => setManualEvents(index)}
							/>
							{manualEvents === index && (
								<DialogElevatorCallsManualTest
									open={manualEvents}
									setOpen={setManualEvents}
									elevatorCall={elevatorCall}
								/>
							)}
						</>
					)}

					{/* Deep Link: Elevator Logs */}
					<Box className={classes.sTableLogsChip}>
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
					</Box>

					{/* Copy Template */}
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
						className={classes.sTableLogsChip}
					/>
				</Stack>
			);
		} else if (column.id === RobotElevatorCallsTableColumnsTypeEnum.ID) {
			return (
				<Box onClick={(e) => dispatch(GeneralCopyToClipboard(elevatorCall.id, e))}>
					<Tooltip title={elevatorCall.id}>
						<Description color="action" fontSize="small" />
					</Tooltip>
				</Box>
			);
		} else {
			const mappedElevatorCall = mapElevatorCall(elevatorCall);
			const value = mappedElevatorCall[column.id];
			if (RobotElevatorCallsTableColumnsTypeEnum.CREATED === column.id) {
				return dateFormat1(String(value));
			} else if (RobotElevatorCallsTableColumnsTypeEnum.HISTORY === column.id) {
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
				if (RobotElevatorCallsTableColumnsTypeEnum.API_STATUS === column.id) {
					return (
						<Tooltip
							title={
								value === RobotElevatorCallsTableColumnStatusTypeEnum.FAILED
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
				} else if (RobotElevatorCallsTableColumnsTypeEnum.E2E_STATUS === column.id) {
					return (
						<Tooltip
							title={
								value === RobotElevatorCallsTableColumnStatusTypeEnum.FAILED
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
				} else if (RobotElevatorCallsTableColumnsTypeEnum.VENDOR === column.id) {
					return vendorName?.title || '';
				}
				return t(value);
			}
			return value;
		}
	};

	return (
		<TableCell key={column.id} align={column.align} style={{ padding: column?.padding }}>
			<>{setCellValue(elevatorCall, column)}</>
		</TableCell>
	);
};
export default RobotElevatorCallsTableBodyCell;
