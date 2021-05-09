import { Paper } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHead from '../../../components/content/page-head/PageHead';
import { sitesSelector } from '../../../slices/sites/Sites.slice';
import SiteContent from './content/SiteContent';
import { SiteParamsInterface } from './Site.interface';

const Site: FC = () => {
	const sites = useSelector(sitesSelector);

	const params: SiteParamsInterface = useParams();

	const cSiteName = sites.content?.dataById[params.site]?.title;

	/**
	 * switch detail page
	 * @returns
	 */
	const switchDetailRoute = () => {
		return <SiteContent />;
	};

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead
				title="SITES.SITE.TITLE"
				description="SITES.SITE.DESCRIPTION"
				labels={{
					siteName: !sites.loader ? cSiteName : ''
				}}
			/>

			{/* Content */}
			{switchDetailRoute()}
		</Paper>
	);
};
export default Site;
