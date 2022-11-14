import { CopyAll } from '@mui/icons-material';
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

import ExternalLink from '../../../../../../components/common/external-link/ExternalLink';
import { ExternalLinkActionTypeEnum } from '../../../../../../components/common/external-link/ExternalLink.enum';
import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { AECDataInterface } from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import {
	RobotElevatorTemplateFetch,
	robotOperationsSelector
} from '../../../../../../slices/business/robots/RobotOperations.slice';
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
	const robotOperations = useSelector(robotOperationsSelector);
	const deepLink = useSelector(deepLinkSelector);

	const [templateIndex, setTemplateIndex] = useState(-1);

	const translation = 'COMMON.ELEVATOR_CALLS.LIST.TABLE.VALUES';

	/**
	 * copy template
	 * @param index
	 */
	const copyTemplate = (index: number) => {
		// set index
		setTemplateIndex(index);

		// dispatch: fetch elevator template
		dispatch(
			RobotElevatorTemplateFetch(elevatorCall.id, (res) => {
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
		if (column.id === GeneralAllElevatorCallsTableColumnsTypeEnum.ELEVATOR_LOGS) {
			return (
				<Stack direction="column" alignItems="center">
					<ExternalLink
						index={index}
						text={t(`${translation}.ELEVATOR_LOGS`)}
						payload={{
							vendor: elevatorCall.vendor,
							from: elevatorCall.createdAt,
							to: elevatorCall.updatedAt
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
						disabled={
							index === templateIndex && robotOperations.elevatorTemplate.loading
						}
						icon={
							index === templateIndex && robotOperations.elevatorTemplate.loading ? (
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
								value === GeneralAllElevatorCallsTableColumnStatusTypeEnum.FAILED
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
				} else if (GeneralAllElevatorCallsTableColumnsTypeEnum.E2E_STATUS === column.id) {
					return (
						<Tooltip
							title={
								value === GeneralAllElevatorCallsTableColumnStatusTypeEnum.FAILED
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
				}
				return t(value);
			}
			return value;
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			<>{setCellValue(elevatorCall, column)}</>
		</TableCell>
	);
};
export default GeneralAllElevatorCallsTableBodyCell;
