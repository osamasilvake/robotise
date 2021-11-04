import { Box, Icon, Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import {
	ECCDataHistoryInterface,
	ECCDataInterface
} from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { momentFormat1, momentFormat3 } from '../../../../../../../utilities/methods/Moment';
import { RobotElevatorCallsTableColumnsTypeEnum } from './RobotElevatorCallsTable.enum';
import {
	RobotElevatorCallsTableBodyCellInterface,
	RobotElevatorCallsTableColumnInterface
} from './RobotElevatorCallsTable.interface';
import { mapElevatorCall, mapHistoryEventType, mapStatus } from './RobotElevatorCallsTable.map';
import { RobotElevatorCallsTableStyle } from './RobotElevatorCallsTable.style';

const RobotElevatorCallsTableBodyCell: FC<RobotElevatorCallsTableBodyCellInterface> = (props) => {
	const { column, elevatorCall } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotElevatorCallsTableStyle();

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
		const mappedElevatorCall = mapElevatorCall(elevatorCall);
		const value = mappedElevatorCall[column.id];
		if (RobotElevatorCallsTableColumnsTypeEnum.CREATED === column.id) {
			return momentFormat1(value);
		} else if (RobotElevatorCallsTableColumnsTypeEnum.HISTORY === column.id) {
			const history = elevatorCall[column.id] as ECCDataHistoryInterface[];
			const historyMapped = value as ECCDataHistoryInterface[];
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
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(elevatorCall, column)}
		</TableCell>
	);
};
export default RobotElevatorCallsTableBodyCell;
