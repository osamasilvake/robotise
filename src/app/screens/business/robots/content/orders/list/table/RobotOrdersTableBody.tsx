import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import {
	SOCDataInterface,
	SOContentInterface
} from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
import { dateSort } from '../../../../../../../utilities/methods/Date';
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

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const navigate = useNavigate();

	const cRobotId = params.robotId;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SOContentInterface): SOCDataInterface[] => {
		let type;
		switch (orderBy) {
			case RobotOrdersTableColumnsTypeEnum.CREATED:
				type = RobotOrdersTableSortTypeEnum.DATE;
				break;
			case RobotOrdersTableColumnsTypeEnum.STATUS:
			case RobotOrdersTableColumnsTypeEnum.TARGET:
			case RobotOrdersTableColumnsTypeEnum.MODE:
			case RobotOrdersTableColumnsTypeEnum.ORIGIN:
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
			const cond1 = key === RobotOrdersTableColumnsTypeEnum.ID;
			if (cond1) return 1;

			const dateA = a[RobotOrdersTableColumnsTypeEnum.CREATED];
			const dateB = b[RobotOrdersTableColumnsTypeEnum.CREATED];
			switch (type) {
				case RobotOrdersTableSortTypeEnum.DATE:
					return dateSort(dateA).diff(dateSort(dateB));
				case RobotOrdersTableSortTypeEnum.STRING:
				default:
					return a[key] && b[key]
						? String(a[key]).localeCompare(String(b[key]))
						: a[key]
						? 1
						: -1;
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
		const link = url.replace(':robotId', cRobotId).replace(':orderId', order.id);

		// navigate
		navigate(link);
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
