import { Box } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SiteDetailGeneral from './general/SiteDetailGeneral';
import { SiteDetailStyles } from './SiteDetail.style';

const SiteDetail: FC = () => {
	const classes = SiteDetailStyles();

	const sites = useSelector(sitesSelector);

	const params: SiteParamsInterface = useParams();
	const siteId = params.site;
	const site = sites.content?.dataById[siteId];

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
	if (!site?.id) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<SiteDetailGeneral site={site} />
		</Box>
	);
};
export default SiteDetail;
