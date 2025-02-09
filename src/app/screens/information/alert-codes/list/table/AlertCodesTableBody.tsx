import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import {
	SACContentInterface,
	SACDataInterface
} from '../../../../../slices/information/alert-codes/AlertCodes.interface';
import { dateSort } from '../../../../../utilities/methods/Date';
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
			case AlertCodesTableColumnsTypeEnum.UPDATED:
				type = AlertCodesTableSortTypeEnum.DATE;
				break;
			case AlertCodesTableColumnsTypeEnum.DESCRIPTION:
			case AlertCodesTableColumnsTypeEnum.SYSTEM:
			case AlertCodesTableColumnsTypeEnum.CODE:
			case AlertCodesTableColumnsTypeEnum.NODE:
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
			const dateA = a[AlertCodesTableColumnsTypeEnum.UPDATED];
			const dateB = b[AlertCodesTableColumnsTypeEnum.UPDATED];
			switch (type) {
				case AlertCodesTableSortTypeEnum.DATE:
					return dateSort(dateA).diff(dateSort(dateB));
				case AlertCodesTableSortTypeEnum.STRING:
				default:
					return a[key] && b[key]
						? String(a[key]).localeCompare(String(b[key]))
						: a[key]
						? 1
						: -1;
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
