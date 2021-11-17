import { Paper } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHead from '../../../components/content/page-head/PageHead';
import { AppConfigService } from '../../../services';
import { sitesSelector } from '../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from './Site.interface';
import SiteTabs from './Site.tabs';

const Site: FC = () => {
	const sites = useSelector(sitesSelector);

	const params = useParams() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const cSiteName = sites.content?.dataById[cSiteId]?.title;
	const dots = AppConfigService.AppOptions.common.dots;

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead
				title="SITES.SITE.TITLE"
				description="SITES.SITE.DESCRIPTION"
				labels={[!sites.loader ? cSiteName || dots : dots]}
			/>

			{/* Content */}
			<SiteTabs />
		</Paper>
	);
};
export default Site;
