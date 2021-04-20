import { Box, Button, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotOrdersOptionNewOrderInterface } from './RobotOrdersOptions.interface';
import { RobotOrdersOptionsStyles } from './RobotOrdersOptions.style';

const RobotOrdersOptionNewOrder: FC<RobotOrdersOptionNewOrderInterface> = (props) => {
	const { executing } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersOptionsStyles();

	// console.log(executing);

	return (
		<Box className={classes.sNewOrder}>
			<Typography variant="subtitle1" color="textSecondary">
				Create
			</Typography>
			<Button variant="outlined">{t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_NEW')}</Button>
		</Box>
	);
};
export default RobotOrdersOptionNewOrder;
