import { ChatOutlined, Check, Close, InfoOutlined } from '@mui/icons-material';
import { Box, Link, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC, MouseEvent } from 'react';

import ReadMore from '../../../../../components/common/read-more/ReadMore';
import { AppConfigService } from '../../../../../services';
import { RTSContentDataInterface } from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { RobotDetailControlModeTypeEnum } from '../../content/detail/commands/RobotDetailCommands.enum';
import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableBodyCellInterface, RobotsTableColumnInterface } from './RobotsTable.interface';
import { percentage } from './RobotsTable.map';
import { RobotsListStyle } from './RobotsTable.style';

const RobotsTableBodyCell: FC<RobotsTableBodyCellInterface> = (props) => {
	const { column, robot } = props;
	const classes = RobotsListStyle();

	/**
	 * handle show robot detail
	 * @param robot
	 * @returns
	 */
	const handleShowRobotDetail =
		(robot: RTSContentDataInterface) => (event: MouseEvent<HTMLAnchorElement>) => {
			// stop propagation
			event.stopPropagation();

			// disable menu
			event.preventDefault();

			// prepare link
			const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL;
			const link = url.replace(':robotId', robot.robotId);

			// open in new tab
			window.open(link);
		};

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (robot: RTSContentDataInterface, column: RobotsTableColumnInterface) => {
		const value = robot[column.id];
		if (RobotsTableColumnsTypeEnum.ROBOT_TITLE === column.id) {
			return (
				<Box>
					<Typography variant="body2">
						<Link
							component="button"
							variant="body2"
							underline="hover"
							onContextMenu={handleShowRobotDetail(robot)}>
							{robot.robotTitle}
						</Link>
						{robot.robotNote && (
							<Tooltip
								title={
									<ReadMore
										text={robot.robotNote}
										variant="caption"
										display="block"
									/>
								}
								leaveDelay={800}>
								<ChatOutlined
									fontSize="small"
									className={clsx(
										classes.sTableRowHelpIcon,
										classes.sTableRowCommentIcon
									)}
								/>
							</Tooltip>
						)}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{robot.siteTitle}
					</Typography>
				</Box>
			);
		} else if (RobotsTableColumnsTypeEnum.ACTIVE === column.id) {
			return (
				<Box>
					{robot.robotIsReady ? (
						<Check color="secondary" fontSize="small" />
					) : (
						<Close color="error" fontSize="small" />
					)}
				</Box>
			);
		} else if (RobotsTableColumnsTypeEnum.CONTROL_MODE === column.id) {
			return (
				<Box>
					{robot.robotControlMode === RobotDetailControlModeTypeEnum.AUTONOMOUS ? (
						<Check color="secondary" fontSize="small" />
					) : (
						<Close color="error" fontSize="small" />
					)}
				</Box>
			);
		} else if (RobotsTableColumnsTypeEnum.ACCEPT_ORDER === column.id) {
			return (
				<Box>
					{robot.siteAcceptOrders ? (
						<Check color="secondary" fontSize="small" />
					) : (
						<Close color="error" fontSize="small" />
					)}
				</Box>
			);
		} else if (RobotsTableColumnsTypeEnum.BATTERY_PERCENTAGE === column.id) {
			return percentage(Number(value));
		} else if (RobotsTableColumnsTypeEnum.MISSION_STATUS === column.id) {
			const mission = robot.robotMission;
			return mission && mission.status ? (
				<Stack spacing={0.5} direction="row" alignItems="center">
					<Typography variant="body2">
						{mission.status || AppConfigService.AppOptions.common.none}
					</Typography>
					{mission.description && (
						<Tooltip title={mission.description}>
							<InfoOutlined fontSize="small" className={classes.sTableRowHelpIcon} />
						</Tooltip>
					)}
				</Stack>
			) : (
				AppConfigService.AppOptions.common.none
			);
		} else if (RobotsTableColumnsTypeEnum.UPDATED_AT === column.id) {
			return momentFormat1(value);
		} else if (RobotsTableColumnsTypeEnum.ALERTS === column.id) {
			return `${robot.robotAlerts.danger}/${robot.robotAlerts.warning}`;
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
