import { TableBody, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';

import {
	SACContentInterface,
	SACDataInterface
} from '../../../../../slices/alert-codes/AlertCodes.interface';
import { momentSort } from '../../../../../utilities/methods/Moment';
import {
	AlertCodesTableColumnsTypeEnum,
	AlertCodesTableSortTypeEnum
} from './AlertCodesTable.enum';
import {
	AlertCodesTableBodyInterface,
	AlertCodesTableColumnInterface
} from './AlertCodesTable.interface';
import { columns } from './AlertCodesTable.list';
import { AlertCodesTableStyle } from './AlertCodesTable.style';
import AlertCodesTableBodyCell from './AlertCodesTableBodyCell';

const AlertCodesTableBody: FC<AlertCodesTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = AlertCodesTableStyle();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SACContentInterface): SACDataInterface[] => {
		let type;
		switch (orderBy) {
			case columns[2].id:
				type = AlertCodesTableSortTypeEnum.NUMBER;
				break;
			case columns[4].id:
				type = AlertCodesTableSortTypeEnum.DATE;
				break;
			case columns[0].id:
			case columns[1].id:
			case columns[3].id:
				type = AlertCodesTableSortTypeEnum.STRING;
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
		key: AlertCodesTableColumnsTypeEnum,
		type: AlertCodesTableSortTypeEnum
	) => {
		return (a: SACDataInterface, b: SACDataInterface) => {
			switch (type) {
				case AlertCodesTableSortTypeEnum.NUMBER:
					return Number(a[key]) - Number(b[key]);
				case AlertCodesTableSortTypeEnum.DATE:
					return momentSort(a[key]).diff(momentSort(b[key]));
				case AlertCodesTableSortTypeEnum.STRING:
				default:
					return String(a[key]).localeCompare(String(b[key]));
			}
		};
	};

	return (
		<TableBody>
			{content &&
				content.data &&
				sortTableData(content)
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((alertCode: SACDataInterface) => (
						<TableRow
							key={alertCode.id}
							tabIndex={-1}
							className={clsx({
								[classes.sTableRowWarning]: alertCode.level === 'warning',
								[classes.sTableRowDanger]: alertCode.level === 'danger'
							})}>
							{columns.map((column: AlertCodesTableColumnInterface) => (
								<AlertCodesTableBodyCell
									key={column.id}
									alertCode={alertCode}
									column={column}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default AlertCodesTableBody;
