import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../slices';
import { PerformanceFetchPurchases } from '../../../../../slices/business/sites/performance/Performance.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SitePerformanceCharts from './charts/SitePerformanceCharts';
import SitePerformancePeriod from './period/SitePerformancePeriod';
import { sitePerformancePeriod } from './period/SitePerformancePeriod.list';
import { SitePerformanceStyle } from './SitePerformance.style';

const SitePerformance: FC = () => {
	const classes = SitePerformanceStyle();

	const dispatch = useDispatch<AppDispatch>();

	const [currentPeriod, setCurrentPeriod] = useState(sitePerformancePeriod[1].id);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;

	useEffect(() => {
		// purchases
		dispatch(
			PerformanceFetchPurchases({
				site: cSiteId,
				lookup: {
					period: 6,
					unit: currentPeriod
				},
				excludeTotalPriceZero: true
			})
		);
	}, [dispatch, cSiteId, currentPeriod]);

	return (
		<Box className={classes.sBox}>
			{/* Period */}
			<SitePerformancePeriod
				sitePerformancePeriod={sitePerformancePeriod}
				currentPeriod={currentPeriod}
				setCurrentPeriod={setCurrentPeriod}
			/>

			{/* Charts */}
			<SitePerformanceCharts />

			{/* KPI */}
			{/*<SitePerformanceKPI />*/}
		</Box>
	);
};
export default SitePerformance;
