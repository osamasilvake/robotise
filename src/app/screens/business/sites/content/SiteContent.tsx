import { Box, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageError from '../../../../components/content/page-error/PageError';
import { sitesSelector } from '../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../Site.interface';
import sitesRoutes from '../Sites.routes';
import SiteConfiguration from './configuration/SiteConfiguration';
import SiteDetail from './detail/SiteDetail';
import SiteProductsList from './products/list/SiteProductsList';
import SiteRoomsList from './rooms/list/SiteRoomsList';

const SiteContent: FC = () => {
	const { t } = useTranslation('SITES');

	const sites = useSelector(sitesSelector);

	const [value, setValue] = useState(-1);
	const params: SiteParamsInterface = useParams();
	const location = useLocation();
	const history = useHistory();

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const problem = !!sites.errors?.id || (sites.content && !cSiteId);

	const translation = 'CONTENT.TABS';

	useEffect(() => {
		const cIndex = sitesRoutes.findIndex(
			(r) => r.path.replace(':siteId', cSiteId) === location.pathname
		);
		setValue(cIndex - 1);
	}, [location.pathname, cSiteId]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const url = sitesRoutes[value + 1].path.replace(':siteId', cSiteId);

		// push to history
		history.push(url);
	};

	return value !== -1 ? (
		<Box>
			{/* Loader */}
			{!problem && sites.loader && (
				<Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />
			)}

			{/* Error */}
			{problem && <PageError />}

			{/* Content */}
			{!!siteSingle?.id && (
				<>
					{/* Tabs */}
					<Tabs
						value={value}
						onChange={handleTabChange}
						variant="scrollable"
						textColor="primary">
						<Tab label={t(`${translation}.DETAIL`)} />
						<Tab label={t(`${translation}.PRODUCTS`)} />
						<Tab label={t(`${translation}.ROOMS`)} />
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

						{/* Configuration */}
						{value === 3 && <SiteConfiguration />}
					</Box>
				</>
			)}
		</Box>
	) : null;
};
export default SiteContent;
