import { Paper } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHead from '../../../components/content/page-head/PageHead';
import { AppConfigService } from '../../../services';
import { sitesSelector } from '../../../slices/business/sites/Sites.slice';
import SiteContent from './content/SiteContent';
import { SiteParamsInterface } from './Site.interface';

const Site: FC = () => {
	const sites = useSelector(sitesSelector);

	const params: SiteParamsInterface = useParams();

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
			<SiteContent />
		</Paper>
	);
};
export default Site;
