import { Box, Tab, Tabs } from '@mui/material';
import { FC, lazy, Suspense, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Loader from '../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../components/common/loader/Loader.enum';
import PageError from '../../../components/content/page-error/PageError';
import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import { AppConfigService } from '../../../services';
import { sitesSelector } from '../../../slices/business/sites/Sites.slice';
import SitePerformance from './content/performance/SitePerformance';
import { SiteParamsInterface } from './Site.interface';
import sitesRoutes from './Sites.routes';

const SiteDetail = lazy(() => import('./content/detail/SiteDetail'));
const SiteProductsList = lazy(() => import('./content/products/list/SiteProductsList'));
const SiteRoomsList = lazy(() => import('./content/rooms/list/SiteRoomsList'));
const SitePhoneConfigsList = lazy(
	() => import('./content/phone-configs/detail/SitePhoneConfigsDetail')
);
const SitePhoneCallsList = lazy(() => import('./content/phone-calls/list/SitePhoneCallsList'));
const SiteStatistics = lazy(() => import('./content/statistics/SiteStatistics'));
const SiteConfiguration = lazy(() => import('./content/configuration/SiteConfiguration'));

const SiteTabs: FC = () => {
	const { t } = useTranslation('SITES');

	const sites = useSelector(sitesSelector);

	const [value, setValue] = useState(-1);
	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const location = useLocation();
	const navigate = useNavigate();

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const problem = !!sites.errors?.id || !siteSingle?.id;

	const translation = 'CONTENT.TABS';
	const offset = 1;

	useEffect(() => {
		const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
		const cPath = location.pathname.replace(skipLastSlashes, '');
		const cIndex = sitesRoutes.findIndex((r) => r.path.replace(':siteId', cSiteId) === cPath);

		setValue(cIndex - offset);
	}, [location.pathname, cSiteId]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const link = sitesRoutes[value + offset].path.replace(':siteId', cSiteId);

		// navigate
		navigate(link);
	};

	// Loader & Error
	if (sites.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	} else if (problem) {
		return <PageError />;
	}

	return value !== -1 && !problem ? (
		<Box>
			{/* Tabs */}
			<Tabs
				allowScrollButtonsMobile
				value={value}
				onChange={handleTabChange}
				variant="scrollable"
				textColor="primary">
				<Tab label={t(`${translation}.DETAIL`)} />
				<Tab label={t(`${translation}.PRODUCTS`)} />
				<Tab label={t(`${translation}.ROOMS`)} />
				<Tab label={t(`${translation}.PHONE_CONFIGS`)} />
				<Tab label={t(`${translation}.PHONE_CALLS`)} />
				<Tab label={t(`${translation}.STATISTICS`)} />
				<Tab label={t(`${translation}.CONFIGURATION`)} />
				<Tab label={t(`${translation}.PERFORMANCE`)} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{/* Detail */}
				{value === 0 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SiteDetail />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Products */}
				{value === 1 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SiteProductsList />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Rooms */}
				{value === 2 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SiteRoomsList />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Phone Configs */}
				{value === 3 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SitePhoneConfigsList />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Phone Calls */}
				{value === 4 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SitePhoneCallsList />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Statistics */}
				{value === 5 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SiteStatistics />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Configuration */}
				{value === 6 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SiteConfiguration />
						</Suspense>
					</ErrorBoundary>
				)}

				{/* Performance */}
				{value === 7 && (
					<ErrorBoundary>
						<Suspense fallback={null}>
							<SitePerformance />
						</Suspense>
					</ErrorBoundary>
				)}
			</Box>
		</Box>
	) : null;
};
export default SiteTabs;
