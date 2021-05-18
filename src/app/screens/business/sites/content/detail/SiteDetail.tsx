import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import { SiteFetch, siteSelector } from '../../../../../slices/sites/Site.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SiteDetailGeneral from './general/SiteDetailGeneral';
import { SiteDetailStyles } from './SiteDetail.style';

const SiteDetail: FC = () => {
	const classes = SiteDetailStyles();

	const dispatch = useDispatch();
	const site = useSelector(siteSelector);

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.site;
	const pSiteId = site.content?.data[0].id;

	useEffect(() => {
		const condition1 = site.content === null && cSiteId;
		const condition2 = site.content !== null && pSiteId && pSiteId !== cSiteId;

		if (condition1 || condition2) {
			// dispatch: fetch site
			dispatch(SiteFetch(cSiteId));
		}
	}, [dispatch, site.content, cSiteId, pSiteId]);

	useEffect(() => {
		const executeServices = () => {
			if (site.content && cSiteId) {
				// dispatch: fetch site
				dispatch(SiteFetch(cSiteId, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.sites.content.detail.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, site.content, cSiteId]);

	// loader
	if (site.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (site.errors) {
		return <PageError message={site.errors?.text} />;
	}

	// null
	if (!site.content) {
		return null;
	}

	// empty
	if (!site.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE"></PageEmpty>;
	}

	return (
		<Box className={classes.sBox}>
			<SiteDetailGeneral site={site.content.data[0]} />
		</Box>
	);
};
export default SiteDetail;
