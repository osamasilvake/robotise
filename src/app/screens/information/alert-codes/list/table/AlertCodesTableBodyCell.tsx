import { TableCell } from '@material-ui/core';
import { FC } from 'react';

import { SACDataInterface } from '../../../../../slices/alert-codes/AlertCodes.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import {
	AlertCodesTableBodyCellInterface,
	AlertCodesTableColumnInterface
} from './AlertCodesTable.interface';
import { columns } from './AlertCodesTable.list';

const AlertCodesTableBodyCell: FC<AlertCodesTableBodyCellInterface> = (props) => {
	const { alertCode, column } = props;

	/**
	 * set cell value
	 * @param alertCode
	 * @param column
	 * @returns
	 */
	const setCellValue = (alertCode: SACDataInterface, column: AlertCodesTableColumnInterface) => {
		const value = alertCode[column.id];
		if (columns[4].id === column.id) {
			return momentFormat1(value);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(alertCode, column)}
		</TableCell>
	);
};
export default AlertCodesTableBodyCell;
