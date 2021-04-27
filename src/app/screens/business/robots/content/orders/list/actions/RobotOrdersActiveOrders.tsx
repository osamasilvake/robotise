import { Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotOrdersActiveOrdersInterface } from './RobotOrdersActions.interface';
import { RobotOrdersActionsStyles } from './RobotOrdersActions.style';

const RobotOrdersActiveOrders: FC<RobotOrdersActiveOrdersInterface> = (props) => {
	const { activeOrders, setActiveOrders, setPage } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersActionsStyles();

	/**
	 * toggle active orders
	 */
	const toggleActiveOrders = () => {
		// set active orders
		setActiveOrders(!activeOrders);

		// set page
		setPage(0);
	};

	return (
		<FormControlLabel
			className={classes.sActiveOrders}
			control={
				<Checkbox
					color="primary"
					name="activeOrders"
					checked={activeOrders}
					onChange={toggleActiveOrders}
				/>
			}
			label={t('CONTENT.ORDERS.LIST.OPTIONS.ORDERS_ACTIVE.LABEL')}
		/>
	);
};
export default RobotOrdersActiveOrders;
