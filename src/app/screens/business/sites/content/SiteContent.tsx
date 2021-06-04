import { Box, Tab, Tabs } from '@material-ui/core';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { SiteParamsInterface } from '../Site.interface';
import sitesRoutes from '../Sites.routes';
import SiteConfiguration from './configuration/SiteConfiguration';
import SiteDetail from './detail/SiteDetail';
import SiteProducts from './products/SiteProducts';

const SiteContent: FC = () => {
	const { t } = useTranslation('SITES');

	const [value, setValue] = useState(-1);
	const params: SiteParamsInterface = useParams();
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const cIndex = sitesRoutes.findIndex(
			(r) => r.path.replace(':site', params.site) === location.pathname
		);
		setValue(cIndex - 1);
	}, [location.pathname, params.site]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const url = sitesRoutes[value + 1].path.replace(':site', params.site);

		// push to history
		history.push(url);
	};

	return value !== -1 ? (
		<Box>
			{/* Tabs */}
			<Tabs value={value} onChange={handleTabChange} variant="scrollable" textColor="primary">
				<Tab label={t('CONTENT.TABS.DETAIL')} />
				<Tab label={t('CONTENT.TABS.PRODUCTS')} />
				<Tab label={t('CONTENT.TABS.CONFIGURATION')} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{/* Detail */}
				{value === 0 && <SiteDetail />}

				{/* Products */}
				{value === 1 && <SiteProducts />}

				{/* Configuration */}
				{value === 2 && <SiteConfiguration />}
			</Box>
		</Box>
	) : null;
};
export default SiteContent;
