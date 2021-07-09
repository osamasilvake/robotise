import { Box, TableCell } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import { FC } from 'react';

import { RTSContentDataInterface } from '../../../../../slices/robots/RobotTwinsSummary.slice.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { RobotDetailControlModeTypeEnum } from '../../content/detail/commands/RobotDetailCommands.enum';
import { RobotsTableBodyCellInterface, RobotsTableColumnInterface } from './RobotsTable.interface';
import { columns } from './RobotsTable.list';

const RobotsTableBodyCell: FC<RobotsTableBodyCellInterface> = (props) => {
	const { column, robot } = props;

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (robot: RTSContentDataInterface, column: RobotsTableColumnInterface) => {
		const value = robot[column.id];
		if (columns[2].id === column.id) {
			return (
				<Box>{robot.robotIsReady ? <Check color="action" /> : <Close color="error" />}</Box>
			);
		} else if (columns[3].id === column.id) {
			return (
				<Box>
					{robot.robotControlMode === RobotDetailControlModeTypeEnum.AUTONOMOUS ? (
						<Check color="action" />
					) : (
						<Close color="error" />
					)}
				</Box>
			);
		} else if (columns[4].id === column.id) {
			return (
				<Box>
					{robot.siteAcceptOrders ? <Check color="action" /> : <Close color="error" />}
				</Box>
			);
		} else if (columns[5].id === column.id) {
			return momentFormat1(value);
		} else if (columns[6].id === column.id) {
			return `${robot.alerts.danger}/${robot.alerts.warning}`;
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(robot, column)}
		</TableCell>
	);
};
export default RobotsTableBodyCell;
