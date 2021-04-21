import { Box, Button, Typography } from '@material-ui/core';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogNewOrder from './DialogNewOrder';
import { RobotOrdersOptionNewOrderInterface } from './RobotOrdersOptions.interface';
import { RobotOrdersOptionsStyles } from './RobotOrdersOptions.style';

const RobotOrdersOptionNewOrder: FC<RobotOrdersOptionNewOrderInterface> = (props) => {
	const { executing } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersOptionsStyles();

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
			<Box className={classes.sNewOrder}>
				<Typography variant="subtitle1" color="textSecondary">
					Create
				</Typography>
				<Button variant="outlined" onClick={onNewOrder}>
					{t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_NEW.LABEL')}
				</Button>
			</Box>
			<DialogNewOrder open={openDialog} setOpen={setOpenDialog} executing={executing} />
		</>
	);
};
export default RobotOrdersOptionNewOrder;
