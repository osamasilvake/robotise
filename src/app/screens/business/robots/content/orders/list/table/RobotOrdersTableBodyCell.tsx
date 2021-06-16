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
import { RobotOrdersTableStyle } from './RobotOrdersTable.style';

const RobotOrdersTableBodyCell: FC<RobotOrdersTableBodyCellInterface> = (props) => {
	const { column, order } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersTableStyle();

	const [open, setOpen] = useState(false);

	/**
	 * open cancel order dialog
	 * @param event
	 */
	const openCancelOrderDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// set open
		setOpen(true);
	};

	/**
	 * set cell value
	 * @param order
	 * @param column
	 * @returns
	 */
	const setCellValue = (order: SOCDataInterface, column: RobotOrdersTableColumnInterface) => {
		const value = order[column.id];
		if (columns[0].id === column.id && typeof value === 'string') {
			return (
				<Box>
					<Status level={mapStatusLevel(value)}>{t(value.replace(':', '_'))}</Status>
					{isOrderCancellable(value) && (
						<>
							<Chip
								size="small"
								label={t('CONTENT.ORDERS.LIST.ACTIONS.CANCEL.LABEL')}
								color="primary"
								variant="outlined"
								clickable
								onClick={openCancelOrderDialog}
								className={classes.sCancelOrder}
							/>
							<DialogCancelOrder order={order} open={open} setOpen={setOpen} />
						</>
					)}
				</Box>
			);
		} else if (columns[3].id === column.id) {
			return momentFormat1(value);
		}
		return t(value);
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(order, column)}
		</TableCell>
	);
};
export default RobotOrdersTableBodyCell;
