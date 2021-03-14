import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RobotsSliceResponseAllDataInterface,
	RobotsSliceResponseAllInterface
} from '../../../../slices/robots/Robots.slice.interface';
import { momentFormat1, momentSort } from '../../../../utilities/methods/Moment';
import { RobotsListTableSortTypeEnum } from './RobotsList.enum';
import {
	RobotsListTableBodyInterface,
	RobotsListTableColumnInterface,
	RobotsListTableHeadId
} from './RobotsList.interface';
import { columns } from './RobotsListTableHead.list';

const RobotsListTableBody: FC<RobotsListTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	const { t } = useTranslation('ROBOTS');

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (
		content: RobotsSliceResponseAllInterface
	): RobotsSliceResponseAllDataInterface[] => {
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
				type = RobotsListTableSortTypeEnum.OBJECT;
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
		return (a: RobotsSliceResponseAllDataInterface, b: RobotsSliceResponseAllDataInterface) => {
			switch (type) {
				case RobotsListTableSortTypeEnum.STRING:
					return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
				case RobotsListTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				default:
					return a.alerts.danger > b.alerts.danger
						? 1
						: b.alerts.danger > a.alerts.danger
						? -1
						: 0;
			}
		};
	};

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		robot: RobotsSliceResponseAllDataInterface,
		column: RobotsListTableColumnInterface
	) => {
		const value = robot[column.id];
		if (columns[2].id === column.id) {
			return robot.isReady ? t('TABLE.VALUES.ON') : t('TABLE.VALUES.OFF');
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
					.map((robot: RobotsSliceResponseAllDataInterface) => {
						return (
							<TableRow hover role="checkbox" tabIndex={-1} key={robot.id}>
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
