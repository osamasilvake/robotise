import { TableCell } from '@mui/material';
import { FC } from 'react';

import { AppConfigService } from '../../../../../services';
import { SDLDataInterface } from '../../../../../slices/settings/deep-links/DeepLinks.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';
import {
	DeepLinksTableBodyCellInterface,
	DeepLinksTableColumnInterface
} from './DeepLinksTable.interface';

const DeepLinksTableBodyCell: FC<DeepLinksTableBodyCellInterface> = (props) => {
	const { deepLink, column } = props;

	/**
	 * set cell value
	 * @param deepLink
	 * @param column
	 * @returns
	 */
	const setCellValue = (deepLink: SDLDataInterface, column: DeepLinksTableColumnInterface) => {
		const value = deepLink[column.id];
		if (DeepLinksTableColumnsTypeEnum.UPDATED_AT === column.id) {
			return momentFormat1(value);
		}
		return value || AppConfigService.AppOptions.common.none;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(deepLink, column)}
		</TableCell>
	);
};
export default DeepLinksTableBodyCell;
