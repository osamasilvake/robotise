import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import {
	SOCDataInterface,
	SOContentInterface
} from '../../../../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { dateSort } from '../../../../../../utilities/methods/Date';
import {
	GeneralAllOrdersTableColumnsTypeEnum,
	GeneralAllOrdersTableSortTypeEnum
} from './GeneralAllOrdersTable.enum';
import {
	GeneralAllOrdersTableBodyInterface,
	GeneralAllOrdersTableColumnInterface
} from './GeneralAllOrdersTable.interface';
import { columns } from './GeneralAllOrdersTable.list';
import { GeneralAllOrdersTableStyle } from './GeneralAllOrdersTable.style';
import GeneralAllOrdersTableBodyCell from './GeneralAllOrdersTableBodyCell';

const GeneralAllOrdersTableBody: FC<GeneralAllOrdersTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = GeneralAllOrdersTableStyle();

	const navigate = useNavigate();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SOContentInterface): SOCDataInterface[] => {
		let type;
		switch (orderBy) {
			case GeneralAllOrdersTableColumnsTypeEnum.CREATED:
				type = GeneralAllOrdersTableSortTypeEnum.DATE;
				break;
			case GeneralAllOrdersTableColumnsTypeEnum.STATUS:
			case GeneralAllOrdersTableColumnsTypeEnum.TARGET:
			case GeneralAllOrdersTableColumnsTypeEnum.MODE:
			case GeneralAllOrdersTableColumnsTypeEnum.ORIGIN:
				type = GeneralAllOrdersTableSortTypeEnum.STRING;
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
		key: GeneralAllOrdersTableColumnsTypeEnum,
		type: GeneralAllOrdersTableSortTypeEnum
	) => {
		return (a: SOCDataInterface, b: SOCDataInterface) => {
			const dateA = a[GeneralAllOrdersTableColumnsTypeEnum.CREATED];
			const dateB = b[GeneralAllOrdersTableColumnsTypeEnum.CREATED];
			switch (type) {
				case GeneralAllOrdersTableSortTypeEnum.DATE:
					return dateSort(dateA).diff(dateSort(dateB));
				case GeneralAllOrdersTableSortTypeEnum.STRING:
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
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.ALL_ORDERS.DETAIL;
		const link = url.replace(':orderId', order.id);

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
							{columns.map((column: GeneralAllOrdersTableColumnInterface) => (
								<GeneralAllOrdersTableBodyCell
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
export default GeneralAllOrdersTableBody;
