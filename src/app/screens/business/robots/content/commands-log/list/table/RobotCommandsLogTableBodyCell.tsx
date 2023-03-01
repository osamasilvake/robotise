import { Description } from '@mui/icons-material';
import { Box, Icon, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Status from '../../../../../../../components/common/status/Status';
import { AppDispatch } from '../../../../../../../slices';
import { GeneralCopyToClipboard } from '../../../../../../../slices/business/general/GeneralOperations.slice';
import { CLCDataInterface } from '../../../../../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { dateFormat1, dateFormat3 } from '../../../../../../../utilities/methods/Date';
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

	const dispatch = useDispatch<AppDispatch>();

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
		if (column.id === RobotCommandsLogTableColumnsTypeEnum.ID) {
			return (
				<Box onClick={(e) => dispatch(GeneralCopyToClipboard(commandLog.id, e))}>
					<Tooltip title={commandLog.id}>
						<Description color="action" fontSize="small" />
					</Tooltip>
				</Box>
			);
		} else {
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
								<Typography variant="body2">
									{t(historyMapped[index].status)}
									{!!item.details && `: ${item.details}`}
								</Typography>
								<Typography variant="caption" color="textSecondary">
									({dateFormat3(item.createdAt)})
								</Typography>
							</Stack>
						))}
					</Box>
				);
			} else if (RobotCommandsLogTableColumnsTypeEnum.CREATED === column.id) {
				return dateFormat1(String(value));
			} else if (typeof value === 'string') {
				if (RobotCommandsLogTableColumnsTypeEnum.STATUS === column.id) {
					return (
						<Status level={mapStatus(value)} capitalize>
							{t(value)}
						</Status>
					);
				}
				return t(value);
			}
			return value;
		}
	};

	return (
		<TableCell key={column.id} align={column.align} style={{ padding: column?.padding }}>
			<>{setCellValue(commandLog, column)}</>
		</TableCell>
	);
};
export default RobotCommandsLogTableBodyCell;
