import {
	ChatOutlined,
	Check,
	Close,
	Description,
	HelpOutline,
	VisibilityOff
} from '@mui/icons-material';
import { Box, Link, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import ReadMore from '../../../../../components/common/read-more/ReadMore';
import { AppConfigService } from '../../../../../services';
import { AppDispatch } from '../../../../../slices';
import { GeneralCopyToClipboard } from '../../../../../slices/business/general/GeneralOperations.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RTSContentDataInterface } from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { dateFormat1 } from '../../../../../utilities/methods/Date';
import { RobotDetailControlModeTypeEnum } from '../../content/detail/commands/RobotDetailCommands.enum';
import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableBodyCellInterface, RobotsTableColumnInterface } from './RobotsTable.interface';
import { percentage } from './RobotsTable.map';
import { RobotsListStyle } from './RobotsTable.style';

const RobotsTableBodyCell: FC<RobotsTableBodyCellInterface> = (props) => {
	const { column, robot } = props;
	const classes = RobotsListStyle();

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const cSiteId = robotTwinsSummary.content?.dataById[robot.robotId]?.siteId;
	const siteTitle = cSiteId && sites.content?.dataById[cSiteId]?.title;
	const siteAcceptOrders = cSiteId && sites.content?.dataById[cSiteId]?.acceptOrders;

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (robot: RTSContentDataInterface, column: RobotsTableColumnInterface) => {
		if (column.id === RobotsTableColumnsTypeEnum.ACCEPT_ORDER) {
			return siteTitle ? (
				<Box>
					{siteAcceptOrders ? (
						<Check color="secondary" fontSize="small" />
					) : (
						<Close color="error" fontSize="small" />
					)}
				</Box>
			) : (
				AppConfigService.AppOptions.common.none
			);
		} else if (column.id === RobotsTableColumnsTypeEnum.ROBOT_ID) {
			return (
				<Box onClick={(e) => dispatch(GeneralCopyToClipboard(robot.robotId, e))}>
					<Tooltip title={robot.robotId}>
						<Description color="action" fontSize="small" />
					</Tooltip>
				</Box>
			);
		} else {
			const value = robot[column.id];
			if (RobotsTableColumnsTypeEnum.ROBOT_TITLE === column.id) {
				return (
					<Box>
						<Stack direction="row" alignItems="center">
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
											classes.sTableIcon,
											classes.sTableIconMoveTop
										)}
									/>
								</Tooltip>
							)}
							{robot.robotHidden && (
								<VisibilityOff
									fontSize="small"
									className={clsx(classes.sTableIcon, classes.sTableIconMoveTop)}
								/>
							)}
						</Stack>

						<Typography variant="body2" color="textSecondary">
							{siteTitle || AppConfigService.AppOptions.common.none}
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
								<HelpOutline fontSize="small" className={classes.sTableIcon} />
							</Tooltip>
						)}
					</Stack>
				) : (
					AppConfigService.AppOptions.common.none
				);
			} else if (RobotsTableColumnsTypeEnum.UPDATED === column.id) {
				return dateFormat1(String(value));
			} else if (RobotsTableColumnsTypeEnum.ALERTS === column.id) {
				return `${robot.robotAlerts.danger}/${robot.robotAlerts.warning}`;
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align} style={{ padding: column?.padding }}>
			<>{setCellValue(robot, column)}</>
		</TableCell>
	);
};
export default RobotsTableBodyCell;
