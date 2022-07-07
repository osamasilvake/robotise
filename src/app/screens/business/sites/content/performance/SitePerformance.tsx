import { Box } from '@mui/material';
import { FC, useState } from 'react';

import PerformanceCharts from './charts/SitePerformanceCharts';
import DashboardKPI from './kpi/DashboardKPI';
import { performancePeriod } from './SitePerformance.list';
import DashboardPeriod from './SitePerformancePeriod';

const SitePerformance: FC = () => {
	const [currentPeriod, setCurrentPeriod] = useState(performancePeriod[1].id);

	return (
		<Box>
			{/* Period */}
			<DashboardPeriod
				performancePeriod={performancePeriod}
				currentPeriod={currentPeriod}
				setCurrentPeriod={setCurrentPeriod}
			/>

			{/* Charts */}
			<PerformanceCharts currentPeriod={currentPeriod} />

			{/* KPI */}
			<DashboardKPI />
		</Box>
	);
};
export default SitePerformance;
