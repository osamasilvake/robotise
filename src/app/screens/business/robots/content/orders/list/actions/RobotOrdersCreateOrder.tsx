import { Box, Button } from '@material-ui/core';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateOrder from './DialogCreateOrder';
import { RobotOrdersActionsStyle } from './RobotOrdersActions.style';

const RobotOrdersCreateOrder: FC = () => {
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersActionsStyle();

	const [open, setOpen] = useState(false);

	/**
	 * open create order dialog
	 * @param event
	 */
	const openCreateOrderDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// show dialog
		setOpen(true);
	};

	return (
		<>
			{/* Action */}
			<Box className={classes.sCreateOrder}>
				<Button variant="outlined" onClick={openCreateOrderDialog}>
					{t('CONTENT.ORDERS.LIST.ACTIONS.CREATE.LABEL')}
				</Button>
			</Box>

			{/* Dialog */}
			<DialogCreateOrder open={open} setOpen={setOpen} />
		</>
	);
};
export default RobotOrdersCreateOrder;
