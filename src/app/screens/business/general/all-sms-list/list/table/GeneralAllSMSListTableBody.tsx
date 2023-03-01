import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import { AllSMSListTypeEnum } from '../../../../../../slices/business/general/all-sms-list/AllSMSList.slice.enum';
import {
	ASLContentInterface,
	ASLDataInterface
} from '../../../../../../slices/business/general/all-sms-list/AllSMSList.slice.interface';
import { dateSort } from '../../../../../../utilities/methods/Date';
import {
	GeneralAllSMSListTableColumnsTypeEnum,
	GeneralAllSMSListTableSortTypeEnum
} from './GeneralAllSMSListTable.enum';
import {
	GeneralAllSMSListTableBodyInterface,
	GeneralAllSMSListTableColumnInterface
} from './GeneralAllSMSListTable.interface';
import { columns } from './GeneralAllSMSListTable.list';
import { GeneralAllSMSListTableStyle } from './GeneralAllSMSListTable.style';
import GeneralAllSMSListTableBodyCell from './GeneralAllSMSListTableBodyCell';

const GeneralAllSMSListTableBody: FC<GeneralAllSMSListTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = GeneralAllSMSListTableStyle();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: ASLContentInterface): ASLDataInterface[] => {
		let type;
		switch (orderBy) {
			case GeneralAllSMSListTableColumnsTypeEnum.UPDATED:
				type = GeneralAllSMSListTableSortTypeEnum.DATE;
				break;
			case GeneralAllSMSListTableColumnsTypeEnum.SITE_ROBOT:
			case GeneralAllSMSListTableColumnsTypeEnum.ROOM:
				type = GeneralAllSMSListTableSortTypeEnum.STRING;
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
		key: GeneralAllSMSListTableColumnsTypeEnum,
		type: GeneralAllSMSListTableSortTypeEnum
	) => {
		return (a: ASLDataInterface, b: ASLDataInterface) => {
			const cond1 = key === GeneralAllSMSListTableColumnsTypeEnum.ID;
			const cond2 = key === GeneralAllSMSListTableColumnsTypeEnum.SITE_ROBOT;
			if (cond1 || cond2) return 1;

			const dateA = a[GeneralAllSMSListTableColumnsTypeEnum.UPDATED];
			const dateB = b[GeneralAllSMSListTableColumnsTypeEnum.UPDATED];
			switch (type) {
				case GeneralAllSMSListTableSortTypeEnum.DATE:
					return dateSort(dateA).diff(dateSort(dateB));
				case GeneralAllSMSListTableSortTypeEnum.STRING:
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
					.map((smsItem: ASLDataInterface, index) => (
						<TableRow
							key={index}
							className={clsx({
								[classes.sTableRowWarning]: smsItem?.isDebug,
								[classes.sLightRow]: smsItem?.type === AllSMSListTypeEnum.DUMMY
							})}>
							{columns.map((column: GeneralAllSMSListTableColumnInterface) => (
								<GeneralAllSMSListTableBodyCell
									key={column.id}
									column={column}
									smsItem={smsItem}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default GeneralAllSMSListTableBody;
