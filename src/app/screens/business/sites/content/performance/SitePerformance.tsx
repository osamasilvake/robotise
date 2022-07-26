import { Box } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppDispatch } from '../../../../../slices';
import {
	PerformanceFetch,
	performanceSelector
} from '../../../../../slices/business/sites/performance/Performance.slice';
import { ProductsFetchList } from '../../../../../slices/business/sites/products/Products.slice';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SitePerformanceCharts from './charts/SitePerformanceCharts';
import SitePerformanceKPI from './kpi/SitePerformanceKPI';
import SitePerformancePeriod from './period/SitePerformancePeriod';
import { sitePerformancePeriod } from './period/SitePerformancePeriod.list';
import { SitePerformanceStyle } from './SitePerformance.style';

const SitePerformance: FC = () => {
	const classes = SitePerformanceStyle();

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const performance = useSelector(performanceSelector);

	const [currentPeriod, setCurrentPeriod] = useState(sitePerformancePeriod[1]);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const cRobotId = sites.content?.dataById[cSiteId]?.robots[0]?.id;
	const refresh = useRef(false);

	useEffect(() => {
		// dispatch: fetch site products
		cSiteId && dispatch(ProductsFetchList(cSiteId, true));

		// dispatch: fetch performance
		dispatch(
			PerformanceFetch(
				{
					lookup: { period: currentPeriod.period, unit: currentPeriod.id },
					robot: cRobotId,
					site: cSiteId,
					excludeTotalPriceZero: true,
					topItems: 3
				},
				!!refresh.current
			)
		);
	}, [dispatch, cSiteId, cRobotId, currentPeriod]);

	useEffect(() => {
		refresh.current = !!performance?.content;
	}, [currentPeriod, performance?.content]);

	// loader
	if (performance.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (!performance.content) {
		return <PageError message={performance.errors?.text} />;
	}

	// init
	if (!performance.init) return null;

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
