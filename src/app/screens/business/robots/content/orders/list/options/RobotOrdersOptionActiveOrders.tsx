import { Box, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotOrdersOptionActiveOrdersInterface } from './RobotOrdersOptions.interface';

const RobotOrdersOptionActiveOrders: FC<RobotOrdersOptionActiveOrdersInterface> = (props) => {
	const { activeOrders, setActiveOrders, setPage } = props;
	const { t } = useTranslation('ROBOTS');

	/**
	 * toggle active orders
	 * @param value
	 * @returns
	 */
	const toggleActiveOrders = () => {
		// set active orders
		setActiveOrders(!activeOrders);

		// set page
		setPage(0);
	};

	return (
		<Box>
			<Typography variant="subtitle1" color="textSecondary">
				Toggle
			</Typography>
			<FormControlLabel
				control={
					<Checkbox
						color="primary"
						name="activeOrders"
						checked={activeOrders}
						onChange={toggleActiveOrders}
					/>
				}
				label={t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDERS_ACTIVE')}
			/>
		</Box>
	);
};
export default RobotOrdersOptionActiveOrders;
