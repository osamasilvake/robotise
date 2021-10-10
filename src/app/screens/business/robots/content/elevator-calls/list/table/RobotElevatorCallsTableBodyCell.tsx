import { Box, Icon, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import {
	ECCDataHistoryInterface,
	ECCDataInterface
} from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { momentFormat1, momentFormat3 } from '../../../../../../../utilities/methods/Moment';
import {
	RobotElevatorCallsTableBodyCellInterface,
	RobotElevatorCallsTableColumnInterface
} from './RobotElevatorCallsTable.interface';
import { columns } from './RobotElevatorCallsTable.list';
import { mapHistoryEventType, mapStatus } from './RobotElevatorCallsTable.map';
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
		const value = elevatorCall[column.id];
		if (columns[5].id === column.id) {
			return momentFormat1(value);
		} else if (columns[4].id === column.id) {
			const history = value as ECCDataHistoryInterface[];
			return (
				<Box>
					{history.map((item, index) => (
						<Box key={index} className={classes.sTableHistoryFlex}>
							<Icon
								color={mapHistoryEventType(t(item.event)).color}
								className={classes.sTableHistoryIcon}>
								{mapHistoryEventType(t(item.event)).icon}
							</Icon>
							<Typography variant="body2" className={classes.sHistoryEvent}>
								{t(item.event)}:
							</Typography>
							<Typography variant="body2" className={classes.sHistoryDetails}>
								{item.details || AppConfigService.AppOptions.common.none}
							</Typography>
							<Typography variant="caption" color="textSecondary">
								({momentFormat3(item.createdAt)})
							</Typography>
						</Box>
					))}
					{!history.length && AppConfigService.AppOptions.common.none}
				</Box>
			);
		} else if (typeof value === 'string') {
			if (columns[0].id === column.id) {
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
