import { Box, Icon, TableCell } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import {
	CLCDataHistoryInterface,
	CLCDataInterface
} from '../../../../../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import {
	RobotCommandsLogTableBodyCellInterface,
	RobotCommandsLogTableColumnInterface
} from './RobotCommandsLogTable.interface';
import { columns } from './RobotCommandsLogTable.list';
import { mapCommandLog, mapHistoryStatus, mapStatus } from './RobotCommandsLogTable.map';
import { RobotCommandsLogTableStyle } from './RobotCommandsLogTable.style';

const RobotCommandsLogTableBodyCell: FC<RobotCommandsLogTableBodyCellInterface> = (props) => {
	const { column, commandLog } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotCommandsLogTableStyle();

	/**
	 * set cell value
	 * @param commandLog
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		commandLog: CLCDataInterface,
		column: RobotCommandsLogTableColumnInterface
	) => {
		const value = mapCommandLog(commandLog)[column.id];
		if (columns[2].id === column.id) {
			const history = value as CLCDataHistoryInterface[];
			return (
				<Box>
					{history.map((item, index) => (
						<Box key={index} className={classes.sTableHistoryFlex}>
							<Icon
								color={mapHistoryStatus(item.status).color}
								className={classes.sTableHistoryIcon}>
								{mapHistoryStatus(item.status).icon}
							</Icon>
							{item.status}
							{item.details && <>: {item.details}</>}
						</Box>
					))}
				</Box>
			);
		} else if (columns[3].id === column.id) {
			return momentFormat1(value);
		} else if (typeof value === 'string') {
			if (columns[1].id === column.id) {
				return <Status level={mapStatus(value)}>{t(value)}</Status>;
			}
			return t(value);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(commandLog, column)}
		</TableCell>
	);
};
export default RobotCommandsLogTableBodyCell;
