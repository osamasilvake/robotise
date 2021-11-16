import { Box, Icon, Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ExternalLink from '../../../../../../../components/common/external-link/ExternalLink';
import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import { ECCDataInterface } from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import {
	RobotElevatorLogsLinkFetch,
	robotSelector
} from '../../../../../../../slices/business/robots/Robot.slice';
import { momentFormat1, momentFormat3 } from '../../../../../../../utilities/methods/Moment';
import { RobotElevatorCallsTableColumnsTypeEnum } from './RobotElevatorCallsTable.enum';
import {
	RobotElevatorCallsTableBodyCellInterface,
	RobotElevatorCallsTableColumnInterface
} from './RobotElevatorCallsTable.interface';
import { mapElevatorCall, mapHistoryEventType, mapStatus } from './RobotElevatorCallsTable.map';
import { RobotElevatorCallsTableStyle } from './RobotElevatorCallsTable.style';

const RobotElevatorCallsTableBodyCell: FC<RobotElevatorCallsTableBodyCellInterface> = (props) => {
	const { index, column, elevatorCall } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotElevatorCallsTableStyle();

	const robot = useSelector(robotSelector);

	const translation = 'CONTENT.ELEVATOR_CALLS.LIST.TABLE.VALUES';

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
				<ExternalLink
					index={index}
					text={t(`${translation}.ELEVATOR_LOGS`)}
					payload={{
						vendor: elevatorCall.vendor,
						from: elevatorCall.createdAt,
						to: elevatorCall.updatedAt
					}}
					FetchExternalLink={RobotElevatorLogsLinkFetch}
					showIcon={robot.elevatorLogs.loading}
					disabled={robot.elevatorLogs.loading}
				/>
			);
		} else {
			const mappedElevatorCall = mapElevatorCall(elevatorCall);
			const value = mappedElevatorCall[column.id];
			if (RobotElevatorCallsTableColumnsTypeEnum.CREATED === column.id) {
				return momentFormat1(value);
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
								flexWrap="wrap"
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
									({momentFormat3(item.createdAt)})
								</Typography>
							</Stack>
						))}
						{!history.length && AppConfigService.AppOptions.common.none}
					</Box>
				);
			} else if (typeof value === 'string') {
				if (RobotElevatorCallsTableColumnsTypeEnum.STATUS === column.id) {
					return <Status level={mapStatus(value)}>{t(value)}</Status>;
				}
				return t(value);
			}
			return value;
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(elevatorCall, column)}
		</TableCell>
	);
};
export default RobotElevatorCallsTableBodyCell;
