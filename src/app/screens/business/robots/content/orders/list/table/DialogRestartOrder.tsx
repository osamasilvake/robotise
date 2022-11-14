import {
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
	OrderRestart,
	ordersSelector
} from '../../../../../../../slices/business/robots/orders/Orders.slice';
import { DialogRestartOrderInterface } from './RobotOrdersTable.interface';

const DialogRestartOrder: FC<DialogRestartOrderInterface> = (props) => {
	const { order, open, setOpen } = props;
	const { t } = useTranslation(['GENERAL', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const orders = useSelector(ordersSelector);

	const translation = 'COMMON.ORDERS.LIST.ACTIONS.RESTART';

	/**
	 * restart order
	 * @param status
	 * @returns
	 */
	const restartOrder = (status: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		!status && setOpen(false);

		// dispatch: restart an order
		status && dispatch(OrderRestart(order?.id, () => setOpen(false)));
	};

	return (
		<Dialog open={open} onClose={restartOrder(false)}>
			<Box onClick={(e) => e.stopPropagation()}>
				<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
				<DialogContent>
					<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={restartOrder(false)}
						disabled={orders.updating}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						onClick={restartOrder(true)}
						disabled={orders.updating || !order.site}
						endIcon={orders.updating && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.CONFIRM')}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
export default DialogRestartOrder;
