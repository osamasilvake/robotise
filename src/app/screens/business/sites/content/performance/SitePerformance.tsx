import { Box } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppDispatch } from '../../../../../slices';
import {
	PerformanceFetchPurchases,
	performanceSelector
} from '../../../../../slices/business/sites/performance/Performance.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SitePerformanceCharts from './charts/SitePerformanceCharts';
import SitePerformanceKPI from './kpi/SitePerformanceKPI';
import SitePerformancePeriod from './period/SitePerformancePeriod';
import { sitePerformancePeriod } from './period/SitePerformancePeriod.list';
import { SitePerformanceStyle } from './SitePerformance.style';

const SitePerformance: FC = () => {
	const classes = SitePerformanceStyle();

	const dispatch = useDispatch<AppDispatch>();
	const performance = useSelector(performanceSelector);

	const [currentPeriod, setCurrentPeriod] = useState(sitePerformancePeriod[1]);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const refresh = useRef(false);

	useEffect(() => {
		// dispatch: fetch purchases
		dispatch(
			PerformanceFetchPurchases(
				{
					site: cSiteId,
					lookup: {
						period: currentPeriod.period,
						unit: currentPeriod.id
					},
					excludeTotalPriceZero: true
				},
				!!refresh.current
			)
		);
	}, [dispatch, cSiteId, currentPeriod]);

	useEffect(() => {
		refresh.current = !!performance?.purchases?.content;
	}, [currentPeriod, performance?.purchases?.content]);

	// loader
	if (performance.purchases.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (!performance.purchases.content?.statistics?.histogram) {
		return <PageError message={performance.purchases.errors?.text} />;
	}

	// init
	if (!performance.purchases.init) return null;

	return (
		<Box className={classes.sBox}>
			{/* Period */}
			<SitePerformancePeriod
				sitePerformancePeriod={sitePerformancePeriod}
				currentPeriod={currentPeriod.id}
				setCurrentPeriod={setCurrentPeriod}
			/>

			{/* Charts */}
			<SitePerformanceCharts />

			{/* KPI */}
			<SitePerformanceKPI />
		</Box>
	);
};
export default SitePerformance;
