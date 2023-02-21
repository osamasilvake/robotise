import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppConfigService } from '../../../../../services';
import {
	RTSContentDataInterface,
	RTSContentInterface
} from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { dateSort } from '../../../../../utilities/methods/Date';
import { RobotsTableColumnsTypeEnum, RobotsTableSortTypeEnum } from './RobotsTable.enum';
import { RobotsTableBodyInterface, RobotsTableColumnInterface } from './RobotsTable.interface';
import { columns } from './RobotsTable.list';
import { RobotsListStyle } from './RobotsTable.style';
import RobotsTableBodyCell from './RobotsTableBodyCell';

const RobotsTableBody: FC<RobotsTableBodyInterface> = (props) => {
	const { content, order, orderBy, siteId } = props;
	const classes = RobotsListStyle();

	const sites = useSelector(sitesSelector);

	const navigate = useNavigate();

	const showHidden = !!content?.state?.showHidden;
	const showSimulation = !!content?.state?.showSimulation;
	const searchText = content?.state?.searchText || '';

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: RTSContentInterface): RTSContentDataInterface[] => {
		let type;
		switch (orderBy) {
			case RobotsTableColumnsTypeEnum.ALERTS:
				type = RobotsTableSortTypeEnum.OBJECT_ALERT;
				break;
			case RobotsTableColumnsTypeEnum.MISSION_STATUS:
				type = RobotsTableSortTypeEnum.OBJECT_MISSION;
				break;
			case RobotsTableColumnsTypeEnum.BATTERY_PERCENTAGE:
				type = RobotsTableSortTypeEnum.NUMBER;
				break;
			case RobotsTableColumnsTypeEnum.UPDATED:
				type = RobotsTableSortTypeEnum.DATE;
				break;
			case RobotsTableColumnsTypeEnum.ACTIVE:
			case RobotsTableColumnsTypeEnum.CONTROL_MODE:
			case RobotsTableColumnsTypeEnum.ACCEPT_ORDER:
				type = RobotsTableSortTypeEnum.BOOLEAN;
				break;
			case RobotsTableColumnsTypeEnum.ROBOT_TITLE:
				type = RobotsTableSortTypeEnum.STRING;
				break;
			default:
				return content.data;
		}

		// cases:
		// 1. alerts column
		// 2. other columns
		let result = [];
		if (orderBy === RobotsTableColumnsTypeEnum.ALERTS) {
			const result1 = content.data.filter((r) => r.robotIsRemoteSafetyResetRequired);
			const result2 = content.data
				.filter((r) => !r.robotIsRemoteSafetyResetRequired)
				.concat()
				.sort(sortByProperty(orderBy, type));
			result = result2.concat(result1);
		} else {
			result = content.data.concat().sort(sortByProperty(orderBy, type));
		}
		return order === 'desc' ? result.reverse() : result;
	};

	/**
	 * sort by property
	 * @param key
	 * @param type
	 * @returns
	 */
	const sortByProperty = (key: RobotsTableColumnsTypeEnum, type: RobotsTableSortTypeEnum) => {
		return (a: RTSContentDataInterface, b: RTSContentDataInterface) => {
			if (key !== RobotsTableColumnsTypeEnum.ACCEPT_ORDER) {
				const dateA = a[RobotsTableColumnsTypeEnum.UPDATED];
				const dateB = b[RobotsTableColumnsTypeEnum.UPDATED];
				switch (type) {
					case RobotsTableSortTypeEnum.OBJECT_ALERT:
						if (a.robotAlerts.danger || b.robotAlerts.danger) {
							return a.robotAlerts.danger - b.robotAlerts.danger;
						}
						return a.robotAlerts.warning - b.robotAlerts.warning;
					case RobotsTableSortTypeEnum.OBJECT_MISSION:
						return a?.robotMission?.status?.localeCompare(b?.robotMission?.status);
					case RobotsTableSortTypeEnum.NUMBER:
						return a[key] && b[key] ? +a[key] - +b[key] : a[key] ? 1 : -1;
					case RobotsTableSortTypeEnum.DATE:
						return dateSort(dateA).diff(dateSort(dateB));
					case RobotsTableSortTypeEnum.BOOLEAN:
						return a[key] ? -1 : 1;
					case RobotsTableSortTypeEnum.STRING:
					default:
						return a[key] && b[key]
							? String(a[key]).localeCompare(String(b[key]))
							: a[key]
							? 1
							: -1;
				}
			}
			return 1;
		};
	};

	/**
	 * filter robots
	 * @returns
	 */
	const filterRobots = () => {
		let list = (content && content.data && sortTableData(content)) || [];
		if (searchText) {
			list = list?.filter((r) => {
				const siteId = r.siteId?.toLowerCase() || '';
				const robotId = r.robotId?.toLowerCase() || '';
				const robotTitle = r.robotTitle?.toLowerCase() || '';
				const siteTitle = sites.content?.dataById?.[siteId]?.title?.toLowerCase() || '';
				const cond1 = robotId.indexOf(searchText) !== -1;
				const cond2 = robotTitle.indexOf(searchText) !== -1;
				const cond3 = siteTitle.indexOf(searchText) !== -1;
				return cond1 || cond2 || cond3;
			});
		}

		if (siteId) return list.filter((r) => r.siteId === siteId);
		return list
			.filter((r) => showHidden || (!showHidden && !r.robotHidden))
			.filter((r) => showSimulation || (!showSimulation && !r.robotIsSimulator));
	};

	/**
	 * handle show robot detail
	 * @param robotTwins
	 * @returns
	 */
	const handleShowRobotDetail = (robotTwins: RTSContentDataInterface) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL;
		const link = url.replace(':robotId', robotTwins.robotId);

		// navigate
		navigate(link);
	};

	return (
		<TableBody>
			{filterRobots().map((robotTwinSummary: RTSContentDataInterface) => (
				<TableRow
					hover
					key={robotTwinSummary.id}
					tabIndex={-1}
					onClick={handleShowRobotDetail(robotTwinSummary)}
					className={clsx({
						[classes.sTableRowWarning]: !!robotTwinSummary.robotAlerts.warning,
						[classes.sTableRowDanger]: !!robotTwinSummary.robotAlerts.danger,
						[classes.sTableRowUrgent]:
							!!robotTwinSummary.robotIsRemoteSafetyResetRequired
					})}>
					{columns.map((column: RobotsTableColumnInterface) => (
						<RobotsTableBodyCell
							key={column.id}
							column={column}
							robot={robotTwinSummary}
						/>
					))}
				</TableRow>
			))}
		</TableBody>
	);
};
export default RobotsTableBody;
