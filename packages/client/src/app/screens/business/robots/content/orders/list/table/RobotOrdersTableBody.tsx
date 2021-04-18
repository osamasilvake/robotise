import { TableBody, TableRow } from '@material-ui/core';
import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import {
	SOCDataInterface,
	SOContentInterface
} from '../../../../../../../slices/orders/Orders.slice.interface';
import { momentSort } from '../../../../../../../utilities/methods/Moment';
import { RobotParamsInterface } from '../../../../Robot.interface';
import {
	RobotOrdersTableColumnsTypeEnum,
	RobotOrdersTableSortTypeEnum
} from './RobotOrdersTable.enum';
import {
	RobotOrdersTableBodyInterface,
	RobotOrdersTableColumnInterface
} from './RobotOrdersTable.interface';
import { columns } from './RobotOrdersTable.list';
import RobotOrdersTableBodyCell from './RobotOrdersTableBodyCell';

const RobotsTableBody: FC<RobotOrdersTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SOContentInterface): SOCDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[0].id:
			case columns[1].id:
			case columns[2].id:
			case columns[3].id:
				type = RobotOrdersTableSortTypeEnum.STRING;
				break;
			case columns[4].id:
				type = RobotOrdersTableSortTypeEnum.DATE;
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
	const sortByProperty = (
		key: RobotOrdersTableColumnsTypeEnum,
		type: RobotOrdersTableSortTypeEnum
	) => {
		return (a: SOCDataInterface, b: SOCDataInterface) => {
			switch (type) {
				case RobotOrdersTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				default:
					return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
			}
		};
	};

	/**
	 * handle show order detail
	 * @param robot
	 * @returns
	 */
	const handleShowOrderDetail = (order: SOCDataInterface) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.DETAIL;
		const robotLink = url.replace(':robot', params.robot).replace(':order', order.id);

		// push to history
		history.push(robotLink);
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((order: SOCDataInterface) => (
						<TableRow
							hover
							key={order.id}
							tabIndex={-1}
							onClick={handleShowOrderDetail(order)}>
							{columns.map((column: RobotOrdersTableColumnInterface) => (
								<RobotOrdersTableBodyCell
									key={column.id}
									column={column}
									order={order}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};

export default RobotsTableBody;
