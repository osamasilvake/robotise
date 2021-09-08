import {
	Alert,
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

import {
	OrderCancel,
	ordersSelector
} from '../../../../../../../slices/business/robots/orders/Orders.slice';
import { DialogCancelOrderInterface } from './RobotOrdersTable.interface';

const DialogCancelOrder: FC<DialogCancelOrderInterface> = (props) => {
	const { order, open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'ROBOTS']);

	const dispatch = useDispatch();
	const orders = useSelector(ordersSelector);

	const translation = 'ROBOTS:CONTENT.ORDERS.LIST.ACTIONS.CANCEL';

	/**
	 * cancel order
	 * @param status
	 * @returns
	 */
	const cancelOrder = (status: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		!status && setOpen(false);

		// dispatch: cancel an order
		status && dispatch(OrderCancel(order, () => setOpen(false)));
	};

	return (
		<Dialog open={open} onClose={cancelOrder(false)}>
			<Box onClick={(e) => e.stopPropagation()}>
				{!order.site && <Alert severity="error">{t(`${translation}.ERROR.SITE`)}</Alert>}
				<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
				<DialogContent>
					<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						disabled={orders.updating}
						onClick={cancelOrder(false)}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						color="error"
						variant="outlined"
						onClick={cancelOrder(true)}
						disabled={orders.updating || !order.site}
						endIcon={orders.updating && <CircularProgress size={20} />}>
						{t('BUTTONS.CONFIRM')}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
export default DialogCancelOrder;
