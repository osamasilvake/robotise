import { Box, Button, Typography } from '@material-ui/core';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateOrder from './DialogCreateOrder';
import { RobotOrdersActionsStyles } from './RobotOrdersActions.style';

const RobotOrdersCreateOrder: FC = () => {
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersActionsStyles();

	const [openDialog, setOpenDialog] = useState(false);

	/**
	 * on new order
	 * @param order
	 * @returns
	 */
	const onNewOrder = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// open dialog
		setOpenDialog(true);
	};

	return (
		<>
			<Box className={classes.sCreateOrder}>
				<Typography variant="subtitle1" color="textSecondary">
					Create
				</Typography>
				<Button variant="outlined" onClick={onNewOrder}>
					{t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_NEW.LABEL')}
				</Button>
			</Box>
			<DialogCreateOrder open={openDialog} setOpen={setOpenDialog} />
		</>
	);
};
export default RobotOrdersCreateOrder;
