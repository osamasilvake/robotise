import { TableBody, TableRow } from '@material-ui/core';
import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/purchases/Purchases.slice.interface';
import { momentSort } from '../../../../../../../utilities/methods/Moment';
import { RobotParamsInterface } from '../../../../Robot.interface';
import {
	RobotPurchasesTableColumnsTypeEnum,
	RobotPurchasesTableSortTypeEnum
} from './RobotPurchasesTable.enum';
import {
	RobotPurchasesTableBodyInterface,
	RobotPurchasesTableColumnInterface
} from './RobotPurchasesTable.interface';
import { columns } from './RobotPurchasesTable.list';
import RobotPurchasesTableBodyCell from './RobotPurchasesTableBodyCell';

const RobotPurchasesTableBody: FC<RobotPurchasesTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SPContentInterface): SPCDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[2].id:
				type = RobotPurchasesTableSortTypeEnum.NUMBER;
				break;
			case columns[1].id:
				type = RobotPurchasesTableSortTypeEnum.DATE;
				break;
			case columns[4].id:
				type = RobotPurchasesTableSortTypeEnum.BOOLEAN;
				break;
			case columns[0].id:
			case columns[3].id:
				type = RobotPurchasesTableSortTypeEnum.STRING;
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
		key: RobotPurchasesTableColumnsTypeEnum,
		type: RobotPurchasesTableSortTypeEnum
	) => {
		return (a: SPCDataInterface, b: SPCDataInterface) => {
			switch (type) {
				case RobotPurchasesTableSortTypeEnum.NUMBER:
					return Number(a[key]) - Number(b[key]);
				case RobotPurchasesTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				case RobotPurchasesTableSortTypeEnum.BOOLEAN:
					return a[key] ? -1 : 1;
				case RobotPurchasesTableSortTypeEnum.STRING:
				default:
					return String(a[key]).localeCompare(String(b[key]));
			}
		};
	};

	/**
	 * handle show purchase detail
	 * @param robot
	 * @returns
	 */
	const handleShowPurchaseDetail = (purchase: SPCDataInterface) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL;
		const robotLink = url.replace(':robot', params.robot).replace(':purchase', purchase.id);

		// push to history
		history.push(robotLink);
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((purchase: SPCDataInterface) => (
						<TableRow
							hover={Number(purchase.totalPrice) > 0}
							key={purchase.id}
							tabIndex={-1}
							onClick={
								Number(purchase.totalPrice) > 0
									? handleShowPurchaseDetail(purchase)
									: () => null
							}>
							{columns.map((column: RobotPurchasesTableColumnInterface) => (
								<RobotPurchasesTableBodyCell
									key={column.id}
									column={column}
									purchase={purchase}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default RobotPurchasesTableBody;
