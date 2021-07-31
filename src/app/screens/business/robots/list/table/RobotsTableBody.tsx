import { TableBody, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { AppConfigService } from '../../../../../services';
import {
	RTSContentDataInterface,
	RTSContentInterface
} from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { momentSort } from '../../../../../utilities/methods/Moment';
import { RobotsTableColumnsTypeEnum, RobotsTableSortTypeEnum } from './RobotsTable.enum';
import { RobotsTableBodyInterface, RobotsTableColumnInterface } from './RobotsTable.interface';
import { columns } from './RobotsTable.list';
import { RobotsListStyle } from './RobotsTable.style';
import RobotsTableBodyCell from './RobotsTableBodyCell';

const RobotsTableBody: FC<RobotsTableBodyInterface> = (props) => {
	const { content, order, orderBy } = props;
	const classes = RobotsListStyle();

	const history = useHistory();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: RTSContentInterface): RTSContentDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[6].id:
				type = RobotsTableSortTypeEnum.OBJECT_ALERT;
				break;
			case columns[4].id:
				type = RobotsTableSortTypeEnum.OBJECT_MISSION;
				break;
			case columns[5].id:
				type = RobotsTableSortTypeEnum.DATE;
				break;
			case columns[1].id:
			case columns[3].id:
				type = RobotsTableSortTypeEnum.BOOLEAN;
				break;
			case columns[0].id:
			case columns[2].id:
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
			switch (type) {
				case RobotsTableSortTypeEnum.OBJECT_ALERT:
					if (a.alerts.danger || b.alerts.danger) {
						return a.alerts.danger - b.alerts.danger;
					}
					return a.alerts.warning - b.alerts.warning;
				case RobotsTableSortTypeEnum.OBJECT_MISSION:
					return a.robotMission.status.localeCompare(b.robotMission.status);
				case RobotsTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				case RobotsTableSortTypeEnum.BOOLEAN:
					return a[key] ? -1 : 1;
				case RobotsTableSortTypeEnum.STRING:
				default:
					return String(a[key]).localeCompare(String(b[key]));
			}
		};
	};

	/**
	 * handle show robot detail
	 * @param robot
	 * @returns
	 */
	const handleShowRobotDetail = (robotTwins: RTSContentDataInterface) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL;
		const robotLink = url.replace(':robotId', robotTwins.robotId);

		// push to history
		history.push(robotLink);
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
							[classes.sTableRowWarning]: !!robotTwins.alerts.warning,
							[classes.sTableRowDanger]: !!robotTwins.alerts.danger
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
