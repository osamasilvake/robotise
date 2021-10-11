import { Box } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SiteDetailGeneral from './general/SiteDetailGeneral';
import { SiteDetailStyle } from './SiteDetail.style';

const SiteDetail: FC = () => {
	const classes = SiteDetailStyle();

	const sites = useSelector(sitesSelector);

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];

	// empty
	if (!sites.content?.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return siteSingle?.id ? (
		<Box className={classes.sBox}>
			<SiteDetailGeneral site={siteSingle} />
		</Box>
	) : null;
};
export default SiteDetail;
