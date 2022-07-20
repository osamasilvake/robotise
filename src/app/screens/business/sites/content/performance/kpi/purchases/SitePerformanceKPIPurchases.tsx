import { Box, Grid } from '@mui/material';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { performanceSelector } from '../../../../../../../slices/business/sites/performance/Performance.slice';
import SitePerformanceKPIPurchaseCard from './SitePerformanceKPIPurchaseCard';

const SitePerformanceKPIPurchases: FC = () => {
	const performance = useSelector(performanceSelector);

	const [sum] = useState(0);
	const [avg] = useState(0);

	return performance.purchases?.content ? (
		<Box>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<SitePerformanceKPIPurchaseCard title="Sum" value={sum} icon="functions" />
				</Grid>

				<Grid item xs={12} sm={6} md={4} lg={3}>
					<SitePerformanceKPIPurchaseCard title="Avg" value={avg} icon="functions" />
				</Grid>
			</Grid>
		</Box>
	) : null;
};
export default SitePerformanceKPIPurchases;
