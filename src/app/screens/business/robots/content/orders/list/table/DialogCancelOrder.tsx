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
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../../slices';
import {
	OrderCancel,
	ordersSelector
} from '../../../../../../../slices/business/robots/orders/Orders.slice';
import { DialogCancelOrderInterface } from './RobotOrdersTable.interface';

const DialogCancelOrder: FC<DialogCancelOrderInterface> = (props) => {
	const { order, open, setOpen } = props;
	const { t } = useTranslation(['GENERAL', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const orders = useSelector(ordersSelector);

	const translation = 'COMMON.ORDERS.LIST.ACTIONS.CANCEL';

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
						onClick={cancelOrder(false)}
						disabled={orders.updating}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						color="error"
						variant="outlined"
						onClick={cancelOrder(true)}
						disabled={orders.updating || !order.site}
						endIcon={orders.updating && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.CONFIRM')}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
export default DialogCancelOrder;
