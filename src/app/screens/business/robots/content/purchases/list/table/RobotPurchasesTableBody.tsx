import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
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
import { RobotPurchasesTableStyle } from './RobotPurchasesTable.style';
import RobotPurchasesTableBodyCell from './RobotPurchasesTableBodyCell';

const RobotPurchasesTableBody: FC<RobotPurchasesTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = RobotPurchasesTableStyle();

	const params = useParams() as RobotParamsInterface;
	const navigate = useNavigate();

	const cRobotId = params.robotId;

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SPContentInterface): SPCDataInterface[] => {
		let type;
		switch (orderBy) {
			case RobotPurchasesTableColumnsTypeEnum.TOTAL_PRICE:
				type = RobotPurchasesTableSortTypeEnum.NUMBER;
				break;
			case RobotPurchasesTableColumnsTypeEnum.CREATED:
				type = RobotPurchasesTableSortTypeEnum.DATE;
				break;
			case RobotPurchasesTableColumnsTypeEnum.TARGET:
			case RobotPurchasesTableColumnsTypeEnum.COMMENT:
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
			if (key !== RobotPurchasesTableColumnsTypeEnum.ITEM_TRACKING) {
				switch (type) {
					case RobotPurchasesTableSortTypeEnum.NUMBER:
						return a[key] && b[key] ? +a[key] - +b[key] : a[key] ? 1 : -1;
					case RobotPurchasesTableSortTypeEnum.DATE:
						return momentSort(a[key]).diff(momentSort(b[key]));
					case RobotPurchasesTableSortTypeEnum.STRING:
					default:
						return a[key] && b[key]
							? String(a[key]).localeCompare(String(b[key]))
							: a[key]
							? 1
							: -1;
				}
			}
			return 1;
		};
	};

	/**
	 * handle show purchase detail
	 * @param purchase
	 * @returns
	 */
	const handleShowPurchaseDetail = (purchase: SPCDataInterface) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL;
		const link = url.replace(':robotId', cRobotId).replace(':purchaseId', purchase.id);

		// navigate
		navigate(link);
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((purchase: SPCDataInterface, index: number) => (
						<TableRow
							hover={!content.state?.locked && +purchase.totalPrice > 0}
							key={purchase.id}
							tabIndex={-1}
							onClick={
								!content.state?.locked && +purchase.totalPrice > 0
									? handleShowPurchaseDetail(purchase)
									: () => null
							}
							className={clsx({
								[classes.sTableRowWarning]: purchase.isDebug
							})}>
							{columns.map((column: RobotPurchasesTableColumnInterface) => (
								<RobotPurchasesTableBodyCell
									key={column.id}
									index={index}
									purchase={purchase}
									column={column}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default RobotPurchasesTableBody;
