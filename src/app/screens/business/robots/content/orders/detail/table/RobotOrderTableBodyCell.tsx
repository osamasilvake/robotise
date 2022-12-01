import { TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import { SOCDataHistoryInterface } from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
import { dateDayJs, dateFormat1, dateUTC } from '../../../../../../../utilities/methods/Date';
import { mapStatus } from '../../list/table/RobotOrdersTable.map';
import {
	RobotOrderTableColumnsTypeEnum,
	RobotOrderTableStatusTypeEnum
} from './RobotOrderTable.enum';
import {
	RobotOrderTableBodyCellInterface,
	RobotOrderTableColumnInterface
} from './RobotOrderTable.interface';
import { RobotOrderTableStyle } from './RobotOrderTable.style';

const RobotOrderTableBodyCell: FC<RobotOrderTableBodyCellInterface> = (props) => {
	const { column, order, nextOrder, firstOrder } = props;
	const { t } = useTranslation('GENERAL');
	const classes = RobotOrderTableStyle();

	const translation = 'COMMON.ORDERS.DETAIL.TABLE.VALUES';

	/**
	 * set cell value
	 * @param row
	 * @param column
	 * @returns
	 */
	const setCellValue = (row: SOCDataHistoryInterface, column: RobotOrderTableColumnInterface) => {
		const val = row[column.id];

		if (column.id === RobotOrderTableColumnsTypeEnum.DETAILS) {
			return (
				<>
					<Status level={mapStatus(row.details)}>
						{t(
							`COMMON.ORDERS.LIST.TABLE.VALUES.STATUS.${row[column.id]?.replace(
								':',
								'_'
							)}`
						)}
					</Status>
					{val === RobotOrderTableStatusTypeEnum.CREATED && (
						<Typography
							variant="caption"
							color="textSecondary"
							className={classes.sCaption}>
							{t(`${translation}.STATUS.ON_ROC`)}
						</Typography>
					)}
					{val === RobotOrderTableStatusTypeEnum.PENDING && (
						<Typography
							variant="caption"
							color="textSecondary"
							className={classes.sCaption}>
							{t(`${translation}.STATUS.RECEIVED_BY_ROBOT`)}
						</Typography>
					)}
				</>
			);
		} else if (column.id === RobotOrderTableColumnsTypeEnum.ELAPSED_TIME) {
			if (!nextOrder) return AppConfigService.AppOptions.common.none;
			const secs = dateDayJs(nextOrder.createdAt).diff(dateDayJs(row.createdAt), 's');
			const formatted = dateUTC(secs * 1000).format('mm:ss');
			return formatted;
		} else if (column.id === RobotOrderTableColumnsTypeEnum.AGGREGATED_TIME) {
			let secs = 0;
			if (!nextOrder) {
				secs = dateDayJs(row.createdAt).diff(dateDayJs(firstOrder.createdAt), 's');
			} else {
				secs = dateDayJs(nextOrder.createdAt).diff(dateDayJs(firstOrder.createdAt), 's');
			}
			const formatted = dateUTC(secs * 1000).format('mm:ss');
			return formatted;
		} else {
			return dateFormat1(row[column.id]);
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			<>{setCellValue(order, column)}</>
		</TableCell>
	);
};
export default RobotOrderTableBodyCell;
