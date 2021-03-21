import { TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { AppConfigService } from '../../../../../services';
import {
	RTSFinalDataInterface,
	RTSSContentInterface
} from '../../../../../slices/robot-twins/RobotTwinsSummary.slice.interface';
import { momentFormat1, momentSort } from '../../../../../utilities/methods/Moment';
import { removeSpecialCharacters } from '../../../../../utilities/methods/StringUtilities';
import { RobotsListTableSortTypeEnum } from './RobotsListTable.enum';
import {
	RobotsListTableBodyInterface,
	RobotsListTableColumnInterface,
	RobotsListTableHeadId
} from './RobotsListTable.interface';
import { columns } from './RobotsListTable.list';
import { robotsListStyles } from './RobotsListTable.style';

const RobotsListTableBody: FC<RobotsListTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	const { t } = useTranslation('ROBOTS');
	const robotsListClasses = robotsListStyles();
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
				type = RobotsListTableSortTypeEnum.STRING;
				break;
			case columns[3].id:
				type = RobotsListTableSortTypeEnum.DATE;
				break;
			case columns[4].id:
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
		const robotName = removeSpecialCharacters(robot.name);
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL;
		const robotLink = url.replace(':id', robotName);

		// push to history
		history.push(robotLink);
	};

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (robot: RTSFinalDataInterface, column: RobotsListTableColumnInterface) => {
		const value = robot[column.id];
		if (columns[2].id === column.id) {
			return (
				<Typography
					variant="button"
					color="error"
					className={clsx(robotsListClasses.sTableCellStatus, {
						[robotsListClasses.sTableCellStatusOn]: robot.isReady,
						[robotsListClasses.sTableCellStatusOff]: !robot.isReady
					})}>
					{robot.isReady ? t('LIST.TABLE.VALUES.ON') : t('LIST.TABLE.VALUES.OFF')}
				</Typography>
			);
		} else if (columns[3].id === column.id) {
			return momentFormat1(value);
		} else if (columns[4].id === column.id) {
			return `${robot.alerts.danger}/${robot.alerts.warning}`;
		}
		return value;
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((robot: RTSFinalDataInterface) => {
						return (
							<TableRow
								hover
								key={robot.id}
								role="checkbox"
								tabIndex={-1}
								className={clsx({
									[robotsListClasses.sTableRowWarning]: !!robot.alerts.warning,
									[robotsListClasses.sTableRowDanger]: !!robot.alerts.danger
								})}
								onClick={handleShowRobotDetail(robot)}>
								{columns.map((column: RobotsListTableColumnInterface) => {
									return (
										<TableCell key={column.id} align={column.align}>
											{setCellValue(robot, column)}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
		</TableBody>
	);
};

export default RobotsListTableBody;
