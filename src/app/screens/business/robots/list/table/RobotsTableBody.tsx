import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppConfigService } from '../../../../../services';
import {
	RTSContentDataInterface,
	RTSContentInterface
} from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { dateSort } from '../../../../../utilities/methods/Date';
import { RobotsTableColumnsTypeEnum, RobotsTableSortTypeEnum } from './RobotsTable.enum';
import { RobotsTableBodyInterface, RobotsTableColumnInterface } from './RobotsTable.interface';
import { columns } from './RobotsTable.list';
import { RobotsListStyle } from './RobotsTable.style';
import RobotsTableBodyCell from './RobotsTableBodyCell';

const RobotsTableBody: FC<RobotsTableBodyInterface> = (props) => {
	const { content, order, orderBy } = props;
	const classes = RobotsListStyle();

	const navigate = useNavigate();

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
		const result = content.data.concat().sort(sortByProperty(orderBy, type));
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
						return a.robotMission.status.localeCompare(b.robotMission.status);
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
			{content &&
				content.data &&
				sortTableData(content).map((robotTwins: RTSContentDataInterface) => (
					<TableRow
						hover
						key={robotTwins.id}
						tabIndex={-1}
						onClick={handleShowRobotDetail(robotTwins)}
						className={clsx({
							[classes.sTableRowWarning]: !!robotTwins.robotAlerts.warning,
							[classes.sTableRowDanger]: !!robotTwins.robotAlerts.danger
						})}>
						{columns.map((column: RobotsTableColumnInterface) => (
							<RobotsTableBodyCell
								key={column.id}
								column={column}
								robot={robotTwins}
							/>
						))}
					</TableRow>
				))}
		</TableBody>
	);
};
export default RobotsTableBody;
