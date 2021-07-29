import { TableCell } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { SLCDataInterface } from '../../../../../../../slices/business/robots/logs/Logs.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import {
	RobotLogsTableBodyCellInterface,
	RobotLogsTableColumnInterface
} from './RobotLogsTable.interface';
import { columns } from './RobotLogsTable.list';
import { mapStatusLevel } from './RobotLogsTable.map';

const RobotLogsTableBodyCell: FC<RobotLogsTableBodyCellInterface> = (props) => {
	const { column, log } = props;
	const { t } = useTranslation('ROBOTS');

	/**
	 * set cell value
	 * @param log
	 * @param column
	 * @returns
	 */
	const setCellValue = (log: SLCDataInterface, column: RobotLogsTableColumnInterface) => {
		const value = log[column.id];
		if (columns[2].id === column.id) {
			return momentFormat1(value);
		} else if (typeof value === 'string') {
			if (columns[1].id === column.id) {
				return <Status level={mapStatusLevel(value)}>{t(value)}</Status>;
			}
			return t(value);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(log, column)}
		</TableCell>
	);
};
export default RobotLogsTableBodyCell;
