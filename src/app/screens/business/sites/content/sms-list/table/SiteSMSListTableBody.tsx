import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import { SMSListTypeEnum } from '../../../../../../slices/business/sites/sms-list/SMSList.slice.enum';
import {
	SLCDataInterface,
	SLContentInterface
} from '../../../../../../slices/business/sites/sms-list/SMSList.slice.interface';
import { dateSort } from '../../../../../../utilities/methods/Date';
import {
	SiteSMSListTableColumnsTypeEnum,
	SiteSMSListTableSortTypeEnum
} from './SiteSMSListTable.enum';
import {
	SiteSMSListTableBodyInterface,
	SiteSMSListTableColumnInterface
} from './SiteSMSListTable.interface';
import { columns } from './SiteSMSListTable.list';
import { SiteSMSListTableStyle } from './SiteSMSListTable.style';
import SiteSMSListTableBodyCell from './SiteSMSListTableBodyCell';

const SiteSMSListTableBody: FC<SiteSMSListTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = SiteSMSListTableStyle();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: SLContentInterface): SLCDataInterface[] => {
		let type;
		switch (orderBy) {
			case SiteSMSListTableColumnsTypeEnum.UPDATED:
				type = SiteSMSListTableSortTypeEnum.DATE;
				break;
			case SiteSMSListTableColumnsTypeEnum.ROOM:
				type = SiteSMSListTableSortTypeEnum.STRING;
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
		key: SiteSMSListTableColumnsTypeEnum,
		type: SiteSMSListTableSortTypeEnum
	) => {
		return (a: SLCDataInterface, b: SLCDataInterface) => {
			const cond1 = key === SiteSMSListTableColumnsTypeEnum.ID;
			if (cond1) return 1;

			const dateA = a[SiteSMSListTableColumnsTypeEnum.UPDATED];
			const dateB = b[SiteSMSListTableColumnsTypeEnum.UPDATED];
			switch (type) {
				case SiteSMSListTableSortTypeEnum.DATE:
					return dateSort(dateA).diff(dateSort(dateB));
				case SiteSMSListTableSortTypeEnum.STRING:
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
					.map((smsItem: SLCDataInterface, index) => (
						<TableRow
							key={index}
							className={clsx({
								[classes.sTableRowWarning]: smsItem?.isDebug,
								[classes.sLightRow]: smsItem?.type === SMSListTypeEnum.DUMMY
							})}>
							{columns.map((column: SiteSMSListTableColumnInterface) => (
								<SiteSMSListTableBodyCell
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
export default SiteSMSListTableBody;
