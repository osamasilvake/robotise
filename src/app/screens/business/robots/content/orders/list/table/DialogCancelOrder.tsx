import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { OrderCancel, ordersSelector } from '../../../../../../../slices/orders/Orders.slice';
import { DialogCancelOrderInterface } from './RobotOrdersTable.interface';

const DialogCancelOrder: FC<DialogCancelOrderInterface> = (props) => {
	const { open, setOpen, order } = props;
	const { t } = useTranslation(['DIALOG', 'ROBOTS']);

	const dispatch = useDispatch();
	const orders = useSelector(ordersSelector);

	/**
	 * on action
	 * @param status
	 * @returns
	 */
	const onAction = (status: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		!status && setOpen(false);

		// dispatch: cancel an order
		status && dispatch(OrderCancel(order));
	};

	return (
		<Dialog open={open} onClose={onAction(false)}>
			<Box onClick={(e) => e.stopPropagation()}>
				<DialogTitle>
					{t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_CANCEL.TITLE')}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_CANCEL.TEXT', {
							room: order.room
						})}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						disabled={orders.canceling}
						onClick={onAction(false)}>
						{t('BUTTONS.DISAGREE')}
					</Button>
					<Button
						variant="outlined"
						onClick={onAction(true)}
						disabled={orders.canceling}
						endIcon={orders.canceling && <CircularProgress size={20} />}>
						{t('BUTTONS.AGREE')}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
export default DialogCancelOrder;
