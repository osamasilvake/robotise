import { Box, Checkbox, Chip, TableCell } from '@material-ui/core';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { SOCDataInterface } from '../../../../../../../slices/orders/Orders.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import { isOrderCancellable } from '../options/RobotOrdersOptions.map';
import DialogCancelOrder from './DialogCancelOrder';
import {
	RobotOrdersTableBodyCellInterface,
	RobotOrdersTableColumnInterface
} from './RobotOrdersTable.interface';
import { columns } from './RobotOrdersTable.list';
import { mapStatusLevel } from './RobotOrdersTable.map';
import { RobotOrdersTableStyles } from './RobotOrdersTable.style';

const RobotOrdersTableBodyCell: FC<RobotOrdersTableBodyCellInterface> = (props) => {
	const { column, order, executing } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersTableStyles();

	const [openDialog, setOpenDialog] = useState(false);

	/**
	 * on cancel order
	 * @param order
	 * @returns
	 */
	const onCancelOrder = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// open dialog
		setOpenDialog(true);
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
								label={t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_CANCEL.LABEL')}
								color="primary"
								variant="outlined"
								clickable={true}
								onClick={onCancelOrder}
								className={classes.sCancelOrder}
							/>
							<DialogCancelOrder
								order={order}
								executing={executing}
								open={openDialog}
								setOpen={setOpenDialog}
							/>
						</>
					)}
				</Box>
			);
		} else if (columns[1].id === column.id) {
			return value ? value : t('CONTENT.ORDERS.LIST.TABLE.VALUES.TARGET.RECEPTION');
		} else if (columns[2].id === column.id) {
			return t(`CONTENT.ORDERS.LIST.TABLE.VALUES.MODE.${value}`);
		} else if (columns[3].id === column.id) {
			return momentFormat1(value);
		} else if (columns[4].id === column.id) {
			return t(`CONTENT.ORDERS.LIST.TABLE.VALUES.ORIGIN.${value}`);
		} else if (columns[5].id === column.id) {
			return <Checkbox disabled checked={!!value} />;
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
