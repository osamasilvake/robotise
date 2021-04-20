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
import { useDispatch } from 'react-redux';

import { OrderDelete } from '../../../../../../../slices/orders/Orders.slice';
import { DialogCancelOrderInterface } from './RobotOrdersTable.interface';

const DialogCancelOrder: FC<DialogCancelOrderInterface> = (props) => {
	const { open, setOpen, order, executing } = props;
	const { t } = useTranslation(['DIALOG', 'ROBOTS']);

	const dispatch = useDispatch();

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

		// delete an order
		status && dispatch(OrderDelete(order));
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
					<Button variant="outlined" onClick={onAction(false)}>
						{t('BUTTONS.DISAGREE')}
					</Button>
					<Button
						variant="outlined"
						onClick={onAction(true)}
						disabled={executing}
						endIcon={executing && <CircularProgress size={20} />}>
						{t('BUTTONS.AGREE')}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
export default DialogCancelOrder;
