import { Box } from '@mui/material';
import { FC, useState } from 'react';

import PerformanceCharts from './charts/SitePerformanceCharts';
import DashboardPeriod from './period/SitePerformancePeriod';
import { performancePeriod } from './period/SitePerformancePeriod.list';
import { PerformanceStyle } from './SitePerformance.style';

const SitePerformance: FC = () => {
	const classes = PerformanceStyle();

	const [currentPeriod, setCurrentPeriod] = useState(performancePeriod[1].id);

	return (
		<Box className={classes.sBox}>
			{/* Period */}
			<DashboardPeriod
				performancePeriod={performancePeriod}
				currentPeriod={currentPeriod}
				setCurrentPeriod={setCurrentPeriod}
			/>

			{/* Charts */}
			<PerformanceCharts currentPeriod={currentPeriod} />

			{/* KPI */}
			{/*<SitePerformanceKPI />*/}
		</Box>
	);
};
export default SitePerformance;
