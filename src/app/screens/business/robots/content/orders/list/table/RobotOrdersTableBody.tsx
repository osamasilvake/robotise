import { TableBody, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import {
	SOCDataInterface,
	SOContentInterface
} from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
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
import { RobotOrdersTableStyle } from './RobotOrdersTable.style';
import RobotOrdersTableBodyCell from './RobotOrdersTableBodyCell';

const RobotOrdersTableBody: FC<RobotOrdersTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = RobotOrdersTableStyle();

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	const cRobotId = params.robotId;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SOContentInterface): SOCDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[3].id:
				type = RobotOrdersTableSortTypeEnum.DATE;
				break;
			case columns[0].id:
			case columns[1].id:
			case columns[2].id:
			case columns[4].id:
				type = RobotOrdersTableSortTypeEnum.STRING;
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
				case RobotOrdersTableSortTypeEnum.STRING:
				default:
					return String(a[key]).localeCompare(String(b[key]));
			}
		};
	};

	/**
	 * handle show order detail
	 * @param order
	 * @returns
	 */
	const handleShowOrderDetail = (order: SOCDataInterface) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.DETAIL;
		const robotLink = url.replace(':robotId', cRobotId).replace(':orderId', order.id);

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
							onClick={handleShowOrderDetail(order)}
							className={clsx({
								[classes.sTableRowWarning]: order.isDebug
							})}>
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
export default RobotOrdersTableBody;
