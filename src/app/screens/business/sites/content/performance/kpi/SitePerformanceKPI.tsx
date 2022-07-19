import { Box } from '@mui/material';
import { FC } from 'react';

import SitePerformanceKPIPurchases from './purchases/SitePerformanceKPIPurchases';
import { SitePerformanceKPIStyle } from './SitePerformanceKPI.style';

const SitePerformanceKPI: FC = () => {
	const classes = SitePerformanceKPIStyle();

	return (
		<Box className={classes.sContainer}>
			{/* Purchases KPI */}
			<SitePerformanceKPIPurchases />
		</Box>
	);
};
export default SitePerformanceKPI;
