import { TableBody, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { AppConfigService } from '../../../../../services';
import {
	RTSFinalDataInterface,
	RTSSContentInterface
} from '../../../../../slices/robot-twins/RobotTwinsSummary.slice.interface';
import { momentSort } from '../../../../../utilities/methods/Moment';
import { RobotsListTableSortTypeEnum } from './RobotsListTable.enum';
import {
	RobotsListTableBodyInterface,
	RobotsListTableColumnInterface,
	RobotsListTableHeadId
} from './RobotsListTable.interface';
import { columns } from './RobotsListTable.list';
import { RobotsListStyles } from './RobotsListTable.style';
import RobotsListTableBodyCell from './RobotsListTableBodyCell';

const RobotsListTableBody: FC<RobotsListTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = RobotsListStyles();

	const history = useHistory();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: RTSSContentInterface): RTSFinalDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[0].id:
			case columns[1].id:
			case columns[2].id:
			case columns[3].id:
				type = RobotsListTableSortTypeEnum.STRING;
				break;
			case columns[4].id:
				type = RobotsListTableSortTypeEnum.DATE;
				break;
			case columns[5].id:
				type = RobotsListTableSortTypeEnum.OBJECT_ALERT;
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
	const sortByProperty = (key: RobotsListTableHeadId, type: RobotsListTableSortTypeEnum) => {
		return (a: RTSFinalDataInterface, b: RTSFinalDataInterface) => {
			switch (type) {
				case RobotsListTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				case RobotsListTableSortTypeEnum.OBJECT_ALERT:
					if (a.alerts.danger || b.alerts.danger) {
						return a.alerts.danger > b.alerts.danger
							? 1
							: b.alerts.danger > a.alerts.danger
							? -1
							: 0;
					}
					return a.alerts.warning > b.alerts.warning
						? 1
						: b.alerts.warning > a.alerts.warning
						? -1
						: 0;
				default:
					return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
			}
		};
	};

	/**
	 * handle show robot detail
	 * @param robot
	 * @returns
	 */
	const handleShowRobotDetail = (robot: RTSFinalDataInterface) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL;
		const robotLink = url.replace(':id', robot.id);

		// push to history
		history.push(robotLink);
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((robot: RTSFinalDataInterface) => (
						<TableRow
							hover
							key={robot.id}
							role="checkbox"
							tabIndex={-1}
							className={clsx({
								[classes.sTableRowWarning]: !!robot.alerts.warning,
								[classes.sTableRowDanger]: !!robot.alerts.danger
							})}
							onClick={handleShowRobotDetail(robot)}>
							{columns.map((column: RobotsListTableColumnInterface) => (
								<RobotsListTableBodyCell
									key={column.id}
									column={column}
									robot={robot}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};

export default RobotsListTableBody;
