import { Box } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SiteDetailGeneral from './general/SiteDetailGeneral';
import { SiteDetailStyle } from './SiteDetail.style';

const SiteDetail: FC = () => {
	const classes = SiteDetailStyle();

	const sites = useSelector(sitesSelector);

	const params: SiteParamsInterface = useParams();
	const siteSingle = sites.content?.dataById[params.siteId];

	// loader
	if (sites.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (sites.errors) {
		return <PageError message={sites.errors?.text} />;
	}

	// null
	if (!sites.content) {
		return null;
	}

	// empty
	if (!sites.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return siteSingle?.id ? (
		<Box className={classes.sBox}>
			<SiteDetailGeneral site={siteSingle} />
		</Box>
	) : null;
};
export default SiteDetail;
