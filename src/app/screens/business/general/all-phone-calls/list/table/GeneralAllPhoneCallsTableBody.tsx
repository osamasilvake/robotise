import { TableBody, TableRow } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import { AllPhoneCallsTypeEnum } from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice.enum';
import {
	APCContentInterface,
	APCDataInterface
} from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice.interface';
import { dateSort } from '../../../../../../utilities/methods/Date';
import {
	GeneralAllPhoneCallsTableColumnsTypeEnum,
	GeneralAllPhoneCallsTableSortTypeEnum
} from './GeneralAllPhoneCallsTable.enum';
import {
	GeneralAllPhoneCallsTableBodyInterface,
	GeneralAllPhoneCallsTableColumnInterface
} from './GeneralAllPhoneCallsTable.interface';
import { columns } from './GeneralAllPhoneCallsTable.list';
import { GeneralAllPhoneCallsTableStyle } from './GeneralAllPhoneCallsTable.style';
import GeneralAllPhoneCallsTableBodyCell from './GeneralAllPhoneCallsTableBodyCell';

const GeneralAllPhoneCallsTableBody: FC<GeneralAllPhoneCallsTableBodyInterface> = (props) => {
	const { content, order, orderBy, page, rowsPerPage } = props;
	const classes = GeneralAllPhoneCallsTableStyle();

	/**
	 * sort table data
	 * @param content
	 * @returns
	 */
	const sortTableData = (content: APCContentInterface): APCDataInterface[] => {
		let type;
		switch (orderBy) {
			case GeneralAllPhoneCallsTableColumnsTypeEnum.UPDATED:
				type = GeneralAllPhoneCallsTableSortTypeEnum.DATE;
				break;
			case GeneralAllPhoneCallsTableColumnsTypeEnum.ROOM:
				type = GeneralAllPhoneCallsTableSortTypeEnum.STRING;
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
		key: GeneralAllPhoneCallsTableColumnsTypeEnum,
		type: GeneralAllPhoneCallsTableSortTypeEnum
	) => {
		return (a: APCDataInterface, b: APCDataInterface) => {
			const dateA = a[GeneralAllPhoneCallsTableColumnsTypeEnum.UPDATED];
			const dateB = b[GeneralAllPhoneCallsTableColumnsTypeEnum.UPDATED];
			switch (type) {
				case GeneralAllPhoneCallsTableSortTypeEnum.DATE:
					return dateSort(dateA).diff(dateSort(dateB));
				case GeneralAllPhoneCallsTableSortTypeEnum.STRING:
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
					.map((phoneCall: APCDataInterface, index) => (
						<TableRow
							key={index}
							className={clsx({
								[classes.sTableRowWarning]: phoneCall?.isDebug,
								[classes.sLightRow]: phoneCall?.type === AllPhoneCallsTypeEnum.DUMMY
							})}>
							{columns.map((column: GeneralAllPhoneCallsTableColumnInterface) => (
								<GeneralAllPhoneCallsTableBodyCell
									key={column.id}
									column={column}
									phoneCall={phoneCall}
								/>
							))}
						</TableRow>
					))}
		</TableBody>
	);
};
export default GeneralAllPhoneCallsTableBody;
