import { Box, Tab, Tabs } from '@material-ui/core';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

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

	const cSiteId = sites.content?.dataById[params.siteId]?.id;

	const common = 'CONTENT.TABS';

	useEffect(() => {
		const cIndex = sitesRoutes.findIndex(
			(r) => r.path.replace(':siteId', params.siteId) === location.pathname
		);
		setValue(cIndex - 1);
	}, [location.pathname, params.siteId]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const url = sitesRoutes[value + 1].path.replace(':siteId', params.siteId);

		// push to history
		history.push(url);
	};

	return value !== -1 ? (
		<Box>
			{!!cSiteId && (
				<>
					{/* Tabs */}
					<Tabs
						value={value}
						onChange={handleTabChange}
						variant="scrollable"
						textColor="primary">
						<Tab label={t(`${common}.DETAIL`)} />
						<Tab label={t(`${common}.PRODUCTS`)} />
						<Tab label={t(`${common}.ROOMS`)} />
						<Tab label={t(`${common}.CONFIGURATION`)} />
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

			{((sites.content && !cSiteId) || !!sites.errors?.id) && <PageError />}
		</Box>
	) : null;
};
export default SiteContent;
