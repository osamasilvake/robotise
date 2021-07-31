import { Box, Icon, TableCell } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import {
	SLCDataHistoryInterface,
	SLCDataInterface
} from '../../../../../../../slices/business/robots/logs/Logs.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import {
	RobotLogsTableBodyCellInterface,
	RobotLogsTableColumnInterface
} from './RobotLogsTable.interface';
import { columns } from './RobotLogsTable.list';
import { mapHistoryStatusLevel, mapStatusLevel } from './RobotLogsTable.map';
import { RobotLogsTableStyle } from './RobotLogsTable.style';

const RobotLogsTableBodyCell: FC<RobotLogsTableBodyCellInterface> = (props) => {
	const { column, log } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotLogsTableStyle();

	/**
	 * set cell value
	 * @param log
	 * @param column
	 * @returns
	 */
	const setCellValue = (log: SLCDataInterface, column: RobotLogsTableColumnInterface) => {
		const value = log[column.id];
		if (columns[3].id === column.id) {
			return momentFormat1(value);
		} else if (columns[2].id === column.id) {
			const history = value as SLCDataHistoryInterface[];
			return (
				<Box>
					{history.map((item) => (
						<Box key={item.status} className={classes.sTableHistoryFlex}>
							<Icon
								color={mapHistoryStatusLevel(item.status).color}
								className={classes.sTableHistoryIcon}>
								{mapHistoryStatusLevel(item.status).icon}
							</Icon>
							{item.status}
							{item.details && <>: {item.details}</>}
						</Box>
					))}
				</Box>
			);
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
