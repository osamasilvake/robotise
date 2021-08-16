import { Box, TableCell, Tooltip, Typography } from '@material-ui/core';
import { Check, Close, InfoOutlined } from '@material-ui/icons';
import { FC } from 'react';

import { AppConfigService } from '../../../../../services';
import { RTSContentDataInterface } from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { RobotDetailControlModeTypeEnum } from '../../content/detail/commands/RobotDetailCommands.enum';
import { RobotsTableBodyCellInterface, RobotsTableColumnInterface } from './RobotsTable.interface';
import { columns } from './RobotsTable.list';
import { percentage } from './RobotsTable.map';
import { RobotsListStyle } from './RobotsTable.style';

const RobotsTableBodyCell: FC<RobotsTableBodyCellInterface> = (props) => {
	const { column, robot } = props;
	const classes = RobotsListStyle();

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (robot: RTSContentDataInterface, column: RobotsTableColumnInterface) => {
		const value = robot[column.id];
		if (columns[0].id === column.id) {
			return (
				<Box>
					{value}
					<Typography variant="body2" color="textSecondary">
						{robot['siteTitle']}
					</Typography>
				</Box>
			);
		} else if (columns[1].id === column.id) {
			return (
				<Box>
					{robot.robotIsReady ? <Check color="secondary" /> : <Close color="error" />}
				</Box>
			);
		} else if (columns[2].id === column.id) {
			return (
				<Box>
					{robot.robotControlMode === RobotDetailControlModeTypeEnum.AUTONOMOUS ? (
						<Check color="secondary" />
					) : (
						<Close color="error" />
					)}
				</Box>
			);
		} else if (columns[3].id === column.id) {
			return (
				<Box>
					{robot.siteAcceptOrders ? <Check color="secondary" /> : <Close color="error" />}
				</Box>
			);
		} else if (columns[4].id === column.id) {
			return percentage(Number(value));
		} else if (columns[5].id === column.id) {
			const mission = robot['robotMission'];
			return mission && mission.status ? (
				<Box className={classes.sTableRowItemFlex}>
					{mission.status || AppConfigService.AppOptions.common.none}
					{mission.description && (
						<Tooltip title={mission.description}>
							<InfoOutlined
								fontSize="small"
								className={classes.sTableRowItemInfoIcon}
							/>
						</Tooltip>
					)}
				</Box>
			) : (
				AppConfigService.AppOptions.common.none
			);
		} else if (columns[6].id === column.id) {
			return momentFormat1(value);
		} else if (columns[7].id === column.id) {
			return `${robot.alerts.danger}/${robot.alerts.warning}`;
		}
		return value || AppConfigService.AppOptions.common.none;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(robot, column)}
		</TableCell>
	);
};
export default RobotsTableBodyCell;
