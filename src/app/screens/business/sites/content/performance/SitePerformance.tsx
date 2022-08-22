import { Box, Stack } from '@mui/material';
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
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SitePerformanceDemography from './demography/SitePerformanceDemography';
import SitePerformanceKPI from './kpi/SitePerformanceKPI';
import SitePerformancePeriod from './period/SitePerformancePeriod';
import { sitePerformancePeriod } from './period/SitePerformancePeriod.list';
import { SitePerformanceStyle } from './SitePerformance.style';
import SitePerformanceScreenshot from './SitePerformanceScreenshot';

const SitePerformance: FC = () => {
	const classes = SitePerformanceStyle();

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const performance = useSelector(performanceSelector);

	const [currentPeriod, setCurrentPeriod] = useState(
		performance.content?.state?.currentPeriod || sitePerformancePeriod[2]
	);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const pSiteId = performance.content?.state?.pSiteId;
	const cSiteId = params.siteId;
	const cRobotId = sites.content?.dataById[cSiteId]?.robots[0]?.id;
	const siteName = sites.content?.dataById[cSiteId]?.title;
	const pCurrentPeriod = performance.content?.state?.currentPeriod;
	const refresh = useRef(false);

	useEffect(() => {
		const condition1 = pCurrentPeriod !== currentPeriod;
		const condition2 = cSiteId !== pSiteId;

		if (condition1 || condition2) {
			// dispatch: fetch performance
			dispatch(
				PerformanceFetch(
					{
						lookup: { period: currentPeriod.period, unit: currentPeriod.id },
						robot: cRobotId,
						site: cSiteId,
						excludeTotalPriceZero: true,
						topItems: 5,
						currentPeriod
					},
					!!refresh.current
				)
			);
		}
	}, [dispatch, pSiteId, cSiteId, cRobotId, pCurrentPeriod, currentPeriod]);

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
			<Box className={classes.sContentTop}>
				<Stack
					spacing={1.5}
					direction="row"
					alignItems="top"
					justifyContent="space-between">
					{/* Download */}
					{siteName && (
						<SitePerformanceScreenshot
							siteName={siteName}
							currentPeriod={currentPeriod.label}
						/>
					)}

					{/* Period */}
					<SitePerformancePeriod
						sitePerformancePeriod={sitePerformancePeriod}
						currentPeriod={currentPeriod.id}
						setCurrentPeriod={setCurrentPeriod}
					/>
				</Stack>
			</Box>

			<Box id="performance" className={classes.sPrint}>
				{/* Demography */}
				<SitePerformanceDemography currentPeriod={currentPeriod.id} />

				{/* KPI */}
				<SitePerformanceKPI />
			</Box>
		</Box>
	);
};
export default SitePerformance;
