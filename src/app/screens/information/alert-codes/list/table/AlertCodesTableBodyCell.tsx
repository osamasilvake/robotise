import { TableCell } from '@mui/material';
import { FC } from 'react';

import { AppConfigService } from '../../../../../services';
import { SACDataInterface } from '../../../../../slices/information/alert-codes/AlertCodes.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { AlertCodesTableColumnsTypeEnum } from './AlertCodesTable.enum';
import {
	AlertCodesTableBodyCellInterface,
	AlertCodesTableColumnInterface
} from './AlertCodesTable.interface';

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
		if (AlertCodesTableColumnsTypeEnum.UPDATED_AT === column.id) {
			return momentFormat1(value);
		}
		return value || AppConfigService.AppOptions.common.none;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(alertCode, column)}
		</TableCell>
	);
};
export default AlertCodesTableBodyCell;
