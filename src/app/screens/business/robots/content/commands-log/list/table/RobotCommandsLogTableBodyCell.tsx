import { Box, Icon, Stack, TableCell } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { CLCDataInterface } from '../../../../../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import { RobotCommandsLogTableColumnsTypeEnum } from './RobotCommandsLogTable.enum';
import {
	RobotCommandsLogTableBodyCellInterface,
	RobotCommandsLogTableColumnInterface
} from './RobotCommandsLogTable.interface';
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
		const mappedCommandLog = mapCommandLog(commandLog);
		const value = mappedCommandLog[column.id];
		if (RobotCommandsLogTableColumnsTypeEnum.HISTORY === column.id) {
			const history = commandLog.history;
			const historyMapped = mappedCommandLog.history;
			return (
				<Box>
					{history.map((item, index) => (
						<Stack
							key={index}
							spacing={0.5}
							direction="row"
							className={classes.sTableHistory}>
							<Icon
								color={mapHistoryStatus(item.status).color}
								className={classes.sTableHistoryIcon}>
								{mapHistoryStatus(item.status).icon}
							</Icon>
							{t(historyMapped[index].status)}
							{item.details && <>: {item.details}</>}
						</Stack>
					))}
				</Box>
			);
		} else if (RobotCommandsLogTableColumnsTypeEnum.CREATED === column.id) {
			return momentFormat1(value);
		} else if (typeof value === 'string') {
			if (RobotCommandsLogTableColumnsTypeEnum.STATUS === column.id) {
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
