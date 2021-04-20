import { Box, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotOrdersOptionsInterface } from './RobotOrdersOptions.interface';

const RobotOrdersOptionActiveOrders: FC<RobotOrdersOptionsInterface> = (props) => {
	const { activeOrders, setActiveOrders } = props;
	const { t } = useTranslation('ROBOTS');

	/**
	 * toggle active orders
	 * @param value
	 * @returns
	 */
	const toggleActiveOrders = () => {
		setActiveOrders(!activeOrders);
	};

	return (
		<Box>
			<Typography variant="subtitle1" color="textSecondary">
				Actions
			</Typography>
			<FormControlLabel
				control={
					<Checkbox color="primary" name="activeOrders" onChange={toggleActiveOrders} />
				}
				label={t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDERS_ACTIVE')}
			/>
		</Box>
	);
};
export default RobotOrdersOptionActiveOrders;
