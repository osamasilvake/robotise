import { Box, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Loader from '../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../components/common/loader/Loader.enum';
import PageError from '../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../services';
import { sitesSelector } from '../../../slices/business/sites/Sites.slice';
import SiteConfiguration from './content/configuration/SiteConfiguration';
import SiteDetail from './content/detail/SiteDetail';
import SitePhoneCallsList from './content/phone-calls/list/SitePhoneCallsList';
import SitePhoneConfigsList from './content/phone-configs/detail/SitePhoneConfigsDetail';
import SiteProductsList from './content/products/list/SiteProductsList';
import SiteRoomsList from './content/rooms/list/SiteRoomsList';
import SiteStatistics from './content/statistics/SiteStatistics';
import { SiteParamsInterface } from './Site.interface';
import sitesRoutes from './Sites.routes';

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

	useEffect(() => {
		const skipLastSlashes = AppConfigService.AppOptions.regex.skipLastSlashes;
		const cPath = location.pathname.replace(skipLastSlashes, '');
		const cIndex = sitesRoutes.findIndex((r) => r.path.replace(':siteId', cSiteId) === cPath);

		setValue(cIndex - 1);
	}, [location.pathname, cSiteId]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const link = sitesRoutes[value + 1].path.replace(':siteId', cSiteId);

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
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{/* Detail */}
				{value === 0 && <SiteDetail />}

				{/* Products */}
				{value === 1 && <SiteProductsList />}

				{/* Rooms */}
				{value === 2 && <SiteRoomsList />}

				{/* Phone Configs */}
				{value === 3 && <SitePhoneConfigsList />}

				{/* Phone Calls */}
				{value === 4 && <SitePhoneCallsList />}

				{/* Statistics */}
				{value === 5 && <SiteStatistics />}

				{/* Configuration */}
				{value === 6 && <SiteConfiguration />}
			</Box>
		</Box>
	) : null;
};
export default SiteTabs;
