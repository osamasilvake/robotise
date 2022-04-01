import { Check, Close } from '@mui/icons-material';
import { Box, TableCell } from '@mui/material';
import { FC } from 'react';

import ReadMore from '../../../../../components/common/read-more/ReadMore';
import { AppConfigService } from '../../../../../services';
import { SMCDataInterface } from '../../../../../slices/settings/middleware-config/MiddlewareConfig.interface';
import { MiddlewareConfigTableColumnsTypeEnum } from './MiddlewareConfigTable.enum';
import {
	MiddlewareConfigTableBodyCellInterface,
	MiddlewareConfigTableColumnInterface
} from './MiddlewareConfigTable.interface';

const MiddlewareConfigTableBodyCell: FC<MiddlewareConfigTableBodyCellInterface> = (props) => {
	const { messageConfig, column } = props;

	/**
	 * set cell value
	 * @param messageConfig
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		messageConfig: SMCDataInterface,
		column: MiddlewareConfigTableColumnInterface
	) => {
		const value = messageConfig[column.id];
		if (
			MiddlewareConfigTableColumnsTypeEnum.AUDIT === column.id ||
			MiddlewareConfigTableColumnsTypeEnum.DEBUG === column.id ||
			MiddlewareConfigTableColumnsTypeEnum.SAVE_HISTORY === column.id ||
			MiddlewareConfigTableColumnsTypeEnum.STOP_PROPAGATE === column.id
		) {
			return (
				<Box>
					{value ? (
						<Check color="secondary" fontSize="small" />
					) : (
						<Close color="error" fontSize="small" />
					)}
				</Box>
			);
		}
		return value || AppConfigService.AppOptions.common.none;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(messageConfig, column)}
		</TableCell>
	);
};
export default MiddlewareConfigTableBodyCell;
