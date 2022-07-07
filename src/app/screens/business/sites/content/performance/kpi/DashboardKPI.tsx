import { Box } from '@mui/material';
import { FC } from 'react';

import { DashboardKPIStyle } from './DashboardKPI.style';
import PurchasesKPI from './purchases/Purchases.kpi';

const DashboardKPI: FC = () => {
	const classes = DashboardKPIStyle();

	return (
		<Box className={classes.sContainer}>
			{/* Purchases KPI */}
			<PurchasesKPI />
		</Box>
	);
};
export default DashboardKPI;
