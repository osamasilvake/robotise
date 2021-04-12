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
import { RobotsTableSortTypeEnum } from './RobotsTable.enum';
import {
	RobotsTableBodyInterface,
	RobotsTableColumnInterface,
	RobotsTableHeadId
} from './RobotsTable.interface';
import { columns } from './RobotsTable.list';
import { RobotsListStyles } from './RobotsTable.style';
import RobotsTableBodyCell from './RobotsTableBodyCell';

const RobotsTableBody: FC<RobotsTableBodyInterface> = (props) => {
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
				type = RobotsTableSortTypeEnum.STRING;
				break;
			case columns[4].id:
				type = RobotsTableSortTypeEnum.DATE;
				break;
			case columns[5].id:
				type = RobotsTableSortTypeEnum.OBJECT_ALERT;
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
	const sortByProperty = (key: RobotsTableHeadId, type: RobotsTableSortTypeEnum) => {
		return (a: RTSFinalDataInterface, b: RTSFinalDataInterface) => {
			switch (type) {
				case RobotsTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				case RobotsTableSortTypeEnum.OBJECT_ALERT:
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
	const handleShowRobotDetail = (robotTwins: RTSFinalDataInterface) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL;
		const robotLink = url.replace(':id', robotTwins.id);

		// push to history
		history.push(robotLink);
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((robotTwins: RTSFinalDataInterface) => (
						<TableRow
							hover
							key={robotTwins.id}
							tabIndex={-1}
							className={clsx({
								[classes.sTableRowWarning]: !!robotTwins.alerts.warning,
								[classes.sTableRowDanger]: !!robotTwins.alerts.danger
							})}
							onClick={handleShowRobotDetail(robotTwins)}>
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
