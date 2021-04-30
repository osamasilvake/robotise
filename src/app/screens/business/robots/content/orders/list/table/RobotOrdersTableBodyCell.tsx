import { Box, Chip, TableCell } from '@material-ui/core';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { SOCDataInterface } from '../../../../../../../slices/orders/Orders.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import DialogCancelOrder from './DialogCancelOrder';
import {
	RobotOrdersTableBodyCellInterface,
	RobotOrdersTableColumnInterface
} from './RobotOrdersTable.interface';
import { columns } from './RobotOrdersTable.list';
import { isOrderCancellable, mapStatusLevel } from './RobotOrdersTable.map';
import { RobotOrdersTableStyles } from './RobotOrdersTable.style';

const RobotOrdersTableBodyCell: FC<RobotOrdersTableBodyCellInterface> = (props) => {
	const { column, order } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersTableStyles();

	const [open, setOpen] = useState(false);

	/**
	 * open cancel order dialog
	 * @param order
	 * @returns
	 */
	const openCancelOrderDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// set open
		setOpen(true);
	};

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (order: SOCDataInterface, column: RobotOrdersTableColumnInterface) => {
		const value = order[column.id];
		if (columns[0].id === column.id && typeof value === 'string') {
			return (
				<Box>
					<Status level={mapStatusLevel(value)}>
						{t(`CONTENT.ORDERS.LIST.TABLE.VALUES.STATUS.${value.replace(':', '_')}`)}
					</Status>
					{isOrderCancellable(value) && (
						<>
							<Chip
								size="small"
								label={t('CONTENT.ORDERS.LIST.ACTIONS.ORDER_CANCEL.LABEL')}
								color="primary"
								variant="outlined"
								clickable={true}
								onClick={openCancelOrderDialog}
								className={classes.sCancelOrder}
							/>
							<DialogCancelOrder order={order} open={open} setOpen={setOpen} />
						</>
					)}
				</Box>
			);
		} else if (columns[1].id === column.id) {
			return value ? value : t('CONTENT.ORDERS.LIST.TABLE.VALUES.TARGET.RECEPTION');
		} else if (columns[2].id === column.id) {
			return t(`CONTENT.ORDERS.COMMON.MODE.${value}`);
		} else if (columns[3].id === column.id) {
			return momentFormat1(value);
		} else if (columns[4].id === column.id) {
			return t(`CONTENT.ORDERS.LIST.TABLE.VALUES.ORIGIN.${value}`);
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(order, column)}
		</TableCell>
	);
};
export default RobotOrdersTableBodyCell;
