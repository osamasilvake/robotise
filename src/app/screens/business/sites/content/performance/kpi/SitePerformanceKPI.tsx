import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { timeout } from '../../../../../../utilities/methods/Timeout';
import SitePerformanceKPIOrders from './orders/SitePerformanceKPIOrders';
import SitePerformanceKPIPurchases from './purchases/SitePerformanceKPIPurchases';
import { SitePerformanceKPIStyle } from './SitePerformanceKPI.style';

const SitePerformanceKPI: FC = () => {
	const classes = SitePerformanceKPIStyle();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const delay = async () => {
			await timeout(250);
			setLoading(true);
		};
		delay();
	}, []);

	// delay boxes
	if (!loading) {
		return null;
	}

	return (
		<Box className={classes.sContainer}>
			{/* Purchases KPI */}
			<SitePerformanceKPIPurchases />

			{/* Orders KPI */}
			<SitePerformanceKPIOrders />
		</Box>
	);
};
export default SitePerformanceKPI;
